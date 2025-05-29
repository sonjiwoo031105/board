import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(
    _: Request,
    context: { params: Promise<{ postId: string }> }
) {
    const { postId } = await context.params;

    const client = await connectDB();
    const db = client.db("board");

    const comments = await db
        .collection("comment")
        .find({ postId })
        .sort({ createdAt: -1 })
        .toArray();

    return NextResponse.json(
        comments,
        { status: 200 }
    );
}
