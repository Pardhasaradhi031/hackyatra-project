import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT
        id,
        ward_number,
        ward_name
      FROM wards
      ORDER BY ward_number;
    `);

    return NextResponse.json({
      success: true,
      wards: rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch wards",
      },
      {
        status: 500,
      }
    );
  }
}