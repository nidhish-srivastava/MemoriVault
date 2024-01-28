"use server"

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

export async function createUser({username,name,dp}){
   try {
    connectToDB()
    const createUser = new UserModel({username:username,name:name,dp:dp})
    return createUser.save()
   } catch (error) {
    return
   }
}