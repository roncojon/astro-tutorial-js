import { getFirestore } from "firebase-admin/firestore";
import { serverApp } from "../server";

const db = getFirestore(serverApp);

interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

export const getAllPosts: () => Promise<Post[]> = async () => {
  const allPosts: Post[] = [];
  const snapshot = await db.collection("posts").get();
  
  snapshot.forEach((doc) => {
    const data = doc.data();
    allPosts.push({ id: doc.id, title: data.title, content: data.content, tags: data.tags || [] });
  });
  
  return allPosts;
}

export const serverAllPosts = await getAllPosts();

export const getAllTags = async (): Promise<string[]> => {
  const allPosts = await getAllPosts();
  const allTags = new Set<string>();

  allPosts.forEach(post => {
    post.tags.forEach(tag => {
      allTags.add(tag);
    });
  });

  console.log('allTagsallTagsallTags',allTags)

  return Array.from(allTags);
}
