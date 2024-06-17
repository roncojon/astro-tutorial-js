import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const friendsRef = db.collection("friends");

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const age = formData.get("age")?.toString();
  const isBestFriend = formData.get("isBestFriend") === "on";

  if (!name || !age) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  if (!params.id) {
    return new Response("Cannot find friend", {
      status: 404,
    });
  }

  try {
    await friendsRef.doc(params.id).update({
      name,
      age: parseInt(age),
      isBestFriend,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/dashboard");
};

export const DELETE: APIRoute = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find friend", {
      status: 404,
    });
  }

  try {
    await friendsRef.doc(params.id).delete();
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/dashboard");
};