import express from 'express';
import { google } from 'googleapis';
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
const port = 3001;

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SHEETS_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = process.env.SPREADSHEET_ID;

app.get("/api/leaderboard", async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A2:B",
    });
    console.log("Backend fetched data:", response.data.values); // <-- add this
    res.json(response.data.values || []);
  } catch (error) {
    console.error("Error fetching from Google Sheets:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
