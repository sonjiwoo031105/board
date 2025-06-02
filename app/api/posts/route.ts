import { connectDB } from "@/lib/mongodb";
import { Post } from "@/types/post";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { SortType } from "@/types/sort";
import { authOptions } from "@/lib/authOptions";

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
            updatedAt: new Date().toISOString(),
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

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const sort = searchParams.get("sort") || SortType.LATEST;

        const db = (await connectDB()).db("board");

        let sortOption;
        switch (sort) {
            case SortType.LIKES:
                sortOption = { likesCount: -1 };
                break;
            case SortType.COMMENTS:
                sortOption = { commentsCount: -1 };
                break;
            default:
                sortOption = { updatedAt: -1, createdAt: -1 };
        }

        const posts = await db.collection("post")
            .aggregate([
                {
                    $lookup: {
                        from: "comment",
                        localField: "_id",
                        foreignField: "postId",
                        as: "comments",
                    },
                },
                {
                    $addFields: {
                        likesCount: { $size: { $ifNull: ["$likes", []] } },
                        commentsCount: { $size: { $ifNull: ["$comments", []] } },
                    },
                },
                { $sort: sortOption },
                { $project: { comments: 0 } }
            ]).toArray();

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
