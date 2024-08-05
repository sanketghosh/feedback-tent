import { LoginFormSchema } from "@/schemas/auth-schemas";
import { prisma } from "@/utils/prisma";
import { type NextResponse, NextRequest } from "next/server";

export async function POST(res: NextResponse, req: NextRequest) {
  const result = LoginFormSchema.safeParse(req.body);
  if (!result.success) {
    return new Response("ERROR! Could not parse results", { status: 400 });
  }

  const { email, password } = result.data;

  try {
    const findMail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // if(!findMail){
    //   re
    // }
  } catch {}
}
