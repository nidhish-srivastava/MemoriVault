"use server"

import { auth } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { connectToDB } from "../dbConnect";
import CapsuleModel from "@/models/capsule.model";


export async function createCapsule(formData) {
  const name = formData.get("name")?.toString() || "";
  const description = formData.get("description")?.toString() || null;
  try {
    connectToDB()
    const authsession = await auth()
    const id = authsession.id._id
    if(id.length>1){
      console.log(id);
      await CapsuleModel.create({
          name,
          description,
          userId : authsession.id._id
      });
    }
    } catch (error) {
      
    }
    revalidatePath("/dashboard");
  }
  
export async function lockCapsule(formData){
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized!");
  }
  const capsuleId = formData.get("capsuleId")?.toString() || "";
  const openDate = formData.get("openDate")?.toString() || "";
  await CapsuleModel.updateOne({_id : capsuleId},{locked : true,openingDate : new Date(openDate)})
  revalidatePath(`/capsule/${capsuleId}`);
}

export async function unlockCapsule(capsuleId){
  const session = await auth()
  if(!session?.user) throw new Error("Unauthorized")
  await CapsuleModel.updateOne({_id : capsuleId},{locked : false,openingDate : null})
  revalidatePath(`/capsule/${capsuleId}`)
}