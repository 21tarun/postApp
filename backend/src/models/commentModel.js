const mongoose =require('mongoose')
const objectId= mongoose.Schema.Types.ObjectId

const commentSchema =new mongoose.Schema({
    postId:objectId,
    userId:{
        type:objectId,
        ref:"user"
    },
    message:String,
    dateTime:String,
    isReply:{
        type:Boolean,
        defalult:false
    },
    replyTo:{          //reply for which comment
        type:objectId,
        ref:'comment'

    },
    isDeleted:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model("comment", commentSchema)
