import { Db, ObjectId } from "mongodb";
import { Session } from "next-auth";

interface AuthOptions {
  db: Db;
  collection: string;
  id: string;
  session: Session | null;
}

export async function isAuthorized({ db, collection, id, session }: AuthOptions) {
  if (!session?.user?.email) {
    throw new Error("UNAUTHORIZED");
  }

  const resource = await db.collection(collection).findOne({ _id: new ObjectId(id) });

  if (!resource) {
    throw new Error("NOT_FOUND");
  }

  if (resource.author?.email !== session.user.email) {
    throw new Error("FORBIDDEN");
  }

  return resource;
}
