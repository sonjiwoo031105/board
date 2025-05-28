import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { id, title, content } = await req.json();

    if (!id || !title || !content) {
      return NextResponse.json(
        { message: "필수 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    const db = (await connectDB()).db("board");
    const result = await db.collection("post").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          content,
          updatedAt: new Date().toISOString(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "해당 게시글이 존재하지 않습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "수정 완료", result });
  } catch (error) {
    return NextResponse.json(
      { message: "서버 에러", error },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await connectDB();
    const db = client.db("board");
    const post = await db
      .collection("post")
      .findOne({ _id: new ObjectId(params.id) });

    if (!post) {
      return NextResponse.json(
        { message: "게시글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("GET 오류:", error);
    return NextResponse.json({ messsage: "서버 에러" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await connectDB();
    const db = client.db("board");

    const result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "삭제할 게시글이 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "게시글이 삭제되었습니다." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "서버 에러", error },
      { status: 500 }
    );
  }
}
