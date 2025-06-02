import { isAuthorized } from "@/lib/isAuthorized";
import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET(
    _: Request,
    context: { params: Promise<{ postId: string }> }
) {
    const { postId } = await context.params;

    const client = await connectDB();
    const db = client.db("board");

    const comments = await db
        .collection("comment")
        .find({ postId: new ObjectId(postId) })
        .sort({ createdAt: -1 })
        .toArray();

    return NextResponse.json(
        comments,
        { status: 200 }
    );
}

export async function DELETE(
    _: Request,
    context: { params: Promise<{ commentId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        const { commentId } = await context.params;
        const client = await connectDB();
        const db = client.db("board");

        await isAuthorized({
            db,
            collection: "comment",
            id: commentId,
            session
        });

        await db
            .collection("comment")
            .deleteOne({ _id: new ObjectId(commentId) });

        return NextResponse.json(
            { message: "Comment deleted" },
            { status: 200 }
        );
    } catch (err: any) {
        switch (err.message) {
            case "UNAUTHORIZED":
                return NextResponse.json({ message: "로그인이 필요합니다" }, { status: 401 });
            case "FORBIDDEN":
                return NextResponse.json({ message: "권한이 없습니다" }, { status: 403 });
            case "NOT_FOUND":
                return NextResponse.json({ message: "게시글을 찾을 수 없습니다" }, { status: 404 });
            default:
                return NextResponse.json({ message: "서버 에러" }, { status: 500 });
        }
    }
}
