import { ObjectId } from "mongodb";

export interface Comment {
    _id?: ObjectId;
    postId: string;
    author: {
        name?: string;
        email?: string;
    };
    content: string;
    createdAt: string;
}
