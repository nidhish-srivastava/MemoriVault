import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
   timeCapsuleId : {type:String,required:true},
   description : {type:String},
   notes : {type:String,required:true},
   type : {type:String}
},
{
    timestamps : true
})

const ItemModel = mongoose.models.Items || mongoose.model('Item',ItemSchema)

export default ItemModel