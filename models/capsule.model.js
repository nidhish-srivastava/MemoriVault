import mongoose from "mongoose";

const CapsuleSchema = new mongoose.Schema({
    data : {
        name : {type:String,required : true},
        description : {type : String},
        userId : {type : String}
    }
},
{
    timestamps : true
})


const CapsuleModel = mongoose.models.Capsule || mongoose.model('Capsule',CapsuleSchema)

export default CapsuleModel