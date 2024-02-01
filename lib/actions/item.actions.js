"use server"

import { auth } from "@/app/auth"
import { revalidatePath } from "next/cache"
import { connectToDB } from "../dbConnect"
import ItemModel from "@/models/item.model";

export async function addNote(formData){
    const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  const notes = formData.get("notes")?.toString() || "";
  const capsuleId = formData.get("capsuleId")?.toString() || "";
  const description = formData.get("description")?.toString() || null;
  try {
    connectToDB()    
    await ItemModel.create({
        timeCapsuleId : capsuleId,
        description,
        notes,
        type : "note"
    })
  } catch (error) {
    
  }
  revalidatePath(`/capsule/${capsuleId}`);
}