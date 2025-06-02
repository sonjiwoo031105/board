import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
    );

    const { postId, content } = await req.json();
    if (!postId || !content) return new Response("Invalid data", { status: 400 });

    const newComment = {
        postId: new ObjectId(postId),
        content,
        author: {
            name: session.user?.name,
            email: session.user?.email,
        },
        createdAt: new Date().toISOString(),
    };

    const client = await connectDB();
    const db = client.db("board");
    await db.collection("comment").insertOne(newComment);

    return NextResponse.json(
        newComment,
        { status: 200 }
    );
}
