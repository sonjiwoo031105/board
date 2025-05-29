import { connectDB } from "@/lib/mongodb";
import { Post } from "@/types/post";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) 
            return NextResponse.json(
                { message: "Unauthorized" }, 
                { status: 401 }
            );

        const { title, content } = await req.json();

        if (!title || !content) {
            return NextResponse.json(
                { message: "제목과 내용을 입력해주세요." },
                { status: 400 }
            );
        }

        const newPost: Post = {
            title,
            content,
            author: {
                name: session.user?.name,
                email: session.user?.email,
            },
            createdAt: new Date().toISOString(),
        };

        const client = await connectDB();
        const db = client.db("board");
        const result = await db.collection("post").insertOne(newPost);

        return NextResponse.json(
            { message: "게시글이 저장되었습니다.", postId: result.insertedId }
        );
    } catch (error) {
        console.error("POST 오류:", error);
        return NextResponse.json(
            { messsage: "서버 오류" }, 
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const client = await connectDB();
        const db = client.db("board");
        const posts = await db
            .collection("post")
            .find()
            .sort({ createdAt: -1 })
            .toArray();
    
        return NextResponse.json(posts, {
            status: 200,
            headers: {
                "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
            },
        });

    } catch (error) {
        console.error("GET 오류:", error);
        return NextResponse.json(
            { messsage: "서버 에러" },
            { status: 500 }
        );
    }
}
