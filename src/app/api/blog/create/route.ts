import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export const POST = async (request: any) => {
  const { title, category, content, tags } = await request.json();

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db("next-app");

  try {
    const newBlog = await db.collection("posts").insertOne({
      title,
      category,
      content,
      tags,
    });
    return new NextResponse("New blog is created.", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
