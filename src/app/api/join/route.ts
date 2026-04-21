import { NextResponse } from "next/server"

import {
  appendJoinInquiryToSheet,
  GoogleSheetsConfigError,
} from "@/lib/google-sheets"
import {
  contributionAreaIds,
  type JoinInquiryField,
  type JoinInquiryPayload,
} from "@/lib/join-form"

export const runtime = "nodejs"

type ErrorResponse = {
  message: string
  fieldErrors?: Partial<Record<JoinInquiryField, string>>
}

function readString(
  payload: Record<string, unknown>,
  key: JoinInquiryField
) {
  const value = payload[key]
  return typeof value === "string" ? value.trim() : ""
}

function validateJoinInquiry(payload: Record<string, unknown>) {
  const inquiry: JoinInquiryPayload = {
    firstName: readString(payload, "firstName"),
    lastName: readString(payload, "lastName"),
    email: readString(payload, "email"),
    major: readString(payload, "major"),
    area: readString(payload, "area"),
    why: readString(payload, "why"),
  }

  const fieldErrors: Partial<Record<JoinInquiryField, string>> = {}

  for (const [key, value] of Object.entries(inquiry) as [
    JoinInquiryField,
    string,
  ][]) {
    if (!value) {
      fieldErrors[key] = "This field is required."
    }
  }

  if (inquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    fieldErrors.email = "Enter a valid email address."
  }

  if (inquiry.area && !contributionAreaIds.has(inquiry.area)) {
    fieldErrors.area = "Choose one of the listed contribution areas."
  }

  if (inquiry.why && inquiry.why.length < 20) {
    fieldErrors.why = "Give a little more detail so the team can evaluate the inquiry."
  }

  return {
    inquiry,
    fieldErrors,
  }
}

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json<ErrorResponse>(
      { message: "Invalid request body." },
      { status: 400 }
    )
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json<ErrorResponse>(
      { message: "Invalid request body." },
      { status: 400 }
    )
  }

  const { inquiry, fieldErrors } = validateJoinInquiry(
    payload as Record<string, unknown>
  )

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json<ErrorResponse>(
      {
        message: "Please correct the highlighted fields and try again.",
        fieldErrors,
      },
      { status: 400 }
    )
  }

  try {
    await appendJoinInquiryToSheet(inquiry)
  } catch (error) {
    if (error instanceof GoogleSheetsConfigError) {
      return NextResponse.json<ErrorResponse>(
        {
          message:
            "This form is not configured yet. Add the Google Sheets environment variables before using it.",
        },
        { status: 503 }
      )
    }

    return NextResponse.json<ErrorResponse>(
      {
        message:
          "The inquiry could not be recorded right now. Please try again in a moment.",
      },
      { status: 502 }
    )
  }

  return NextResponse.json({
    message:
      "Inquiry submitted. The response has been recorded and the team can now review it from Google Sheets.",
  })
}
