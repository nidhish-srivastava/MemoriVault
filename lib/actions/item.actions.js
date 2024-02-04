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

export async function uploadImage(formData){
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  // These images should be the urls of images being hosted on Cloudinary
  // User can add a single image,when he adds again,the same document is searched,then the new image is added to the array of images
  const image = formData.get("file")?.toString() || "";
  const capsuleId = formData.get("capsuleId")?.toString() || "";
  const description = formData.get("description")?.toString() || null;

  try {
    connectToDB()
    // const response =  await ItemModel.updateOne({timeCapsuleId:capsuleId,type:"file"},{
    //   $push : {images : image}
    // })
    // if(response.modifiedCount==0){
     const newItem = new ItemModel({
       timeCapsuleId : capsuleId,
       type : "file",
       image,
       description
     })
     try {
       await newItem.save()
     } catch (error) {
       console.log(error);      
     }
  //  }

  } catch (error) {
    
  }
  revalidatePath(`/capsule/${capsuleId}`);
}