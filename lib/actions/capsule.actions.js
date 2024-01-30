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
        data: {
          name,
          description,
          userId : authsession.id._id
        },
      });
    }
    } catch (error) {
      
    }
    revalidatePath("/dashboard");
  }
  
//  export async function fetchCapsules(userId){
//   try {
//     return CapsuleModel.find({data : userId})
//   } catch (error) {
    
//   }
//  }