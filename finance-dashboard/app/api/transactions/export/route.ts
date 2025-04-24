import { NextResponse } from "next/server"

export async function GET() {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

    // Fetch the CSV from the backend
    const response = await fetch(`${API_BASE_URL}/transactions/export`, {
      method: "GET",
      headers: {
        "Content-Type": "text/csv",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming you have a way to get the token
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch CSV")
    }

    const csvData = await response.text()

    // Return the CSV as a download
    return new NextResponse(csvData, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="transactions.csv"',
      },
    })
  } catch (error) {
    console.error("Error exporting CSV:", error)
    return NextResponse.json({ error: "Failed to export transactions" }, { status: 500 })
  }
}
