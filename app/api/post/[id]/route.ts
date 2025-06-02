import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { isAuthorized } from "@/lib/isAuthorized";
import { authOptions } from "@/lib/authOptions";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const { id: postId, title, content } = await req.json();

    if (!postId || !title || !content) {
      return NextResponse.json(
        { message: "필수 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    const db = (await connectDB()).db("board");

    await isAuthorized({
      db,
      collection: "post",
      id: postId,
      session
    });

    await db.collection("post").updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          title,
          content,
          updatedAt: new Date().toISOString(),
        },
      }
    );

    return NextResponse.json({ message: "수정 완료" });
  } catch (err: unknown) {
    if (err instanceof Error) {
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
}

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
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

    return NextResponse.json(
      post,
      { status: 200 }
    );
  } catch (error) {
    console.error("GET 오류:", error);
    return NextResponse.json(
      { messsage: "서버 에러" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    const { id: postId } = await context.params;
    const client = await connectDB();
    const db = client.db("board");

    await isAuthorized({
      db,
      collection: "post",
      id: postId,
      session
    });

    await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(postId) });

    return NextResponse.json(
      { message: "Post deleted" },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
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
}
