"use server"

import { auth } from "@/app/auth"
import { connectToDB } from "../dbConnect"

import UserModel from "@/models/user.model"

export async function userExists(username){
    try {
        connectToDB()
        const userCheck = await UserModel.findOne({username : username})
        return userCheck
    } catch (error) {
        
    }
}

export async function createUser({name,email,image}){
   try {
    connectToDB()
    const createUser = new UserModel({name:name,email:email,image:image})
    return createUser.save()
   } catch (error) {
    return
   }
}
