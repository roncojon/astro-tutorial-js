import { getFirestore } from "firebase-admin/firestore";
import { serverApp } from "../server";

const db = getFirestore(serverApp);

interface Post {
  id: string;
  title: string;
  content: string;
}

export const getAllPosts: () => Promise<Post[]> = async () => {

  const allPostss: Post[] = [];
  const snapshot = await db.collection("posts").get();
  
  snapshot.forEach((doc) => {
    const data = doc.data();
    allPostss.push({ id: doc.id, title: data.title, content: data.content });
  });
  
  return await allPostss;
}

export const serverAllPosts = await getAllPosts();