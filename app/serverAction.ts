'use server'
import { auth } from "@clerk/nextjs/server";

export async function serverAction() {
  await auth()
  console.log("auth completed within server action");
}

