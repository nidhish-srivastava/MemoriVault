import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
   timeCapsuleId : {type:String,required:true},
   description : {type:String},
   notes : {type:String},
   type : {type:String},
   image : {type:String}
//    images : {type : [String]}
},
{
    timestamps : true
})

const ItemModel = mongoose.models.Item || mongoose.model('Item',ItemSchema)

export default ItemModel