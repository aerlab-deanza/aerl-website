import { google } from "googleapis";

export interface ApplicationRow {
  firstName: string;
  lastName: string;
  email: string;
  major: string;
  area: string;
  why: string;
}

export async function appendApplication(data: ApplicationRow): Promise<void> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email) throw new Error("Missing env var: GOOGLE_SERVICE_ACCOUNT_EMAIL");
  if (!key) throw new Error("Missing env var: GOOGLE_PRIVATE_KEY");
  if (!sheetId) throw new Error("Missing env var: GOOGLE_SHEET_ID");

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
          data.firstName,
          data.lastName,
          data.email,
          data.major,
          data.area,
          data.why,
        ],
      ],
    },
  });
}
