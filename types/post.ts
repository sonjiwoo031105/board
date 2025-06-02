import { ObjectId } from "mongodb";

export interface Post {
  _id?: ObjectId
  title: string;          
  content: string;        
  author?: {
    name?: string | null;
    email?: string | null;
  };       
  createdAt: string;      
  updatedAt?: string;  
  likes?: string[];   
  likesCount?: string;
  commentsCount?: string;
}
