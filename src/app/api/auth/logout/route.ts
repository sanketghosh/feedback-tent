import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const storeCookie = cookies();
    storeCookie.delete({
      name: "auth_token",
    });

    return NextResponse.json(
      {
        message: "SUCCESS! User has been logged in.",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "ERROR! Internal server error.",
      },
      { status: 500 },
    );
  }
}
