import { connectDB } from "@/lib/mongodb";
import { Post } from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, content, author } = body;

        if (!title || !content) {
            return NextResponse.json({ message: "제목과 내용을 입력해주세요." }, { status: 400 });
        }

        const newPost: Post = {
            title,
            content,
            author: author || "익명",
            createdAt: new Date().toISOString(),
        };

        const client = await connectDB();
        const db = client.db("board");
        const result = await db.collection("post").insertOne(newPost);

        return NextResponse.json({ message: "게시글이 저장되었습니다.", postId: result.insertedId });
    } catch (error) {
        console.error("POST 오류:", error);
        return NextResponse.json({ messsage: "서버 오류" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const client = await connectDB();
        const db = client.db("board");
        const posts = await db.collection("post").find().sort({ createdAt: -1 }).toArray();
    
        return NextResponse.json(posts);
    } catch (error) {
        console.error("GET 오류:", error);
        return NextResponse.json({ messsage: "서버 에러" }, { status: 500 });
    }
}
