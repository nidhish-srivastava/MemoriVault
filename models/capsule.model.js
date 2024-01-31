import mongoose from "mongoose";

const CapsuleSchema = new mongoose.Schema({
        name : {type:String,required : true},
        description : {type : String},
        userId : {type : String},
        locked : {type : Boolean},
        openingDate : {type : Date}
},
{
    timestamps : true
})

const CapsuleModel = mongoose.models.Capsule || mongoose.model('Capsule',CapsuleSchema)

export default CapsuleModel