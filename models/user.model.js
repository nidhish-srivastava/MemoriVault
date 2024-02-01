import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {type : String,required : true},
    email : {type:String,required : true,unique:true},
    image : {type : String,required : true},
},

{
    timestamps : true
})


const UserModel = mongoose.models.User || mongoose.model('User',UserSchema)

export default UserModel