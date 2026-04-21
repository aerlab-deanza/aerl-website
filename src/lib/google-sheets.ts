import { createPrivateKey, createSign } from "node:crypto"

import type { JoinInquiryPayload } from "@/lib/join-form"

const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token"
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets"

type GoogleSheetsConfig = {
  spreadsheetId: string
  sheetName: string
  clientEmail: string
  privateKey: string
  privateKeyId?: string
}

export class GoogleSheetsConfigError extends Error {}

function base64UrlEncode(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

function getGoogleSheetsConfig(): GoogleSheetsConfig {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim()
  const sheetName =
    process.env.GOOGLE_SHEETS_SHEET_NAME?.trim() || "Join Inquiries"
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.trim()
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n")
  const privateKeyId = process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID?.trim()

  if (!spreadsheetId || !clientEmail || !privateKey) {
    throw new GoogleSheetsConfigError(
      "Google Sheets integration is not configured. Missing spreadsheet ID, client email, or private key."
    )
  }

  return {
    spreadsheetId,
    sheetName,
    clientEmail,
    privateKey,
    privateKeyId,
  }
}

function createSignedJwt(config: GoogleSheetsConfig) {
  const issuedAt = Math.floor(Date.now() / 1000)
  const expiresAt = issuedAt + 3600

  const header = {
    alg: "RS256",
    typ: "JWT",
    ...(config.privateKeyId ? { kid: config.privateKeyId } : {}),
  }

  const payload = {
    iss: config.clientEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_TOKEN_ENDPOINT,
    exp: expiresAt,
    iat: issuedAt,
  }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const unsignedToken = `${encodedHeader}.${encodedPayload}`

  const signer = createSign("RSA-SHA256")
  signer.update(unsignedToken)
  signer.end()

  const signature = signer.sign(
    createPrivateKey({
      key: config.privateKey,
      format: "pem",
    })
  )

  return `${unsignedToken}.${base64UrlEncode(signature)}`
}

async function getGoogleAccessToken(config: GoogleSheetsConfig) {
  const assertion = createSignedJwt(config)
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  })

  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Google token request failed: ${errorText}`)
  }

  const data = (await response.json()) as { access_token?: string }

  if (!data.access_token) {
    throw new Error("Google token response did not include an access token.")
  }

  return data.access_token
}

export async function appendJoinInquiryToSheet(inquiry: JoinInquiryPayload) {
  const config = getGoogleSheetsConfig()
  const accessToken = await getGoogleAccessToken(config)
  const range = `${config.sheetName}!A:G`
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [
        [
          new Date().toISOString(),
          inquiry.firstName,
          inquiry.lastName,
          inquiry.email,
          inquiry.major,
          inquiry.area,
          inquiry.why,
        ],
      ],
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Google Sheets append failed: ${errorText}`)
  }
}
