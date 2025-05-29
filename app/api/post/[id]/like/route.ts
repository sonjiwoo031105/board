import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const userEmail = session.user?.email;
    if (!userEmail) {
        return NextResponse.json(
            { message: "Invalid user" },
            { status: 400 }
        );
    }

    const { id: postId } = await context.params;
    const client = await connectDB();
    const db = client.db("board");
    const post = await db
    .collection("post")
    .findOne({ _id: new ObjectId(postId) });

    if (!post) {
        return NextResponse.json(
            { message: "Post not found" },
            { status: 404 }
        );
    }

    const alreadyLiked = post.likes?.includes(userEmail);

    let updatedLikes: string[];
    if (alreadyLiked) {
        updatedLikes = post.likes.filter((email: string) => email !== userEmail);
    } else {
        updatedLikes = [...(post.likes || []), userEmail];
    }

    await db.collection("post").updateOne(
        { _id: new ObjectId(postId) },
        { $set: { likes: updatedLikes } }
    );

    return NextResponse.json(
        { 
            message: "success",
            liked: !alreadyLiked,
            count: updatedLikes.length
        },
        { status: 200 }
    )
}
