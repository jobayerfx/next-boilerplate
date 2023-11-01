import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import clientPromise from "mongodb";

export const POST = async (request: any) => {
  const { email, password } = await request.json();

  const client = await clientPromise;
  const db = client.db("next-app");

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
