import mongoose,{Schema} from "mongoose";

const MeetingSchema = new Schema(
    {
        user_id:{
            type:Stirng,
        },
        Meeting_cond:{
            type:String,
        },
        Date:{
            type:Date,
            default:Date.now,
            require:true,
        },
    }
);

const Meeting = mongoose.model("Meeting",MeetingSchema);

export default Meeting;