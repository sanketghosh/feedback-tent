import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { RegisterFormSchema } from "@/schemas/auth-schemas";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const requestBody = await req.json();

    const result = RegisterFormSchema.safeParse(requestBody);
    if (!result.success) {
      return NextResponse.json(
        {
          message: "ERROR! Could not parse results",
        },
        { status: 400 },
      );
    }

    const { email, password, fullName } = result.data;

    const hashPassword = await bcrypt.hash(password, 10);

    let userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        {
          message: "ERROR! Registration not possible, bad request.",
        },
        {
          status: 400,
        },
      );
    }

    // create the user
    const newUser = await prisma.user.create({
      data: {
        fullName: fullName,
        email: email,
        password: hashPassword,
      },
    });

    //
    const { password: usersHashedPassword, ...userData } = newUser;

    let registerUserDataToBeSent = {
      userId: newUser.id,
      userFullName: newUser.fullName,
      userEmail: newUser.email,
      userAvatar: newUser.avatar,
      message: "SUCCES! User has been registered",
    };

    // token expiring age (max token age)
    const tokenExpAge = 1000 * 60 * 60 * 24 * 7;

    // jwt token sign
    const jwtToken = jwt.sign(
      {
        id: userData.id,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: tokenExpAge,
      },
    );

    const storeCookie = cookies();
    storeCookie.set({
      name: "auth_token",
      value: process.env.JWT_SECRET_KEY as string,
      httpOnly: true,
      maxAge: tokenExpAge,
    });

    return NextResponse.json(
      {
        data: registerUserDataToBeSent,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "ERROR! Internal server error.",
      },
      {
        status: 500,
      },
    );
  }
}
