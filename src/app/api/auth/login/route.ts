import { LoginFormSchema } from "@/schemas/auth-schemas";
import { prisma } from "@/utils/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const requestBody = await req.json();

    const result = LoginFormSchema.safeParse(requestBody);
    if (!result.success) {
      return NextResponse.json(
        { message: "ERROR! Could not parse results" },
        { status: 400 },
      );
    }

    const { email, password } = result.data;

    // find user
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // check if user exists
    if (!findUser) {
      return NextResponse.json(
        {
          message: "ERROR! Invalid credentials.",
        },
        {
          status: 401,
        },
      );
    }

    // assert that existing user is not null
    const user = findUser as User;

    // compare password
    let comparePassword = await bcrypt.compare(password, findUser.password);

    // password not matched ?
    if (!comparePassword) {
      return NextResponse.json(
        {
          message: "ERROR! Invalid credentials.",
        },
        { status: 401 },
      );
    }

    // token expiring age (max token age)
    const tokenExpAge = 1000 * 60 * 60 * 24 * 7;

    // login data we are sending back
    let loginDataToBeSent = {
      userId: user.id,
      userFullName: user.fullName,
      userEmail: user.email,
      userCreatedAt: user.createdAt,
      userAvatar: user.avatar,
      message: "SUCCESS! User has been logged in.",
    };

    // jwt token sign
    const jwtToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: tokenExpAge,
      },
    );

    // set cookie
    const storeCookie = cookies();
    storeCookie.set({
      name: "auth_token",
      value: process.env.JWT_SECRET_KEY as string,
      httpOnly: true,
      maxAge: tokenExpAge,
    });

    return NextResponse.json(
      {
        data: loginDataToBeSent,
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
      { status: 500 },
    );
  }
}
