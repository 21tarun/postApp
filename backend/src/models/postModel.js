const mongoose =require('mongoose')
const objectId= mongoose.Schema.Types.ObjectId


const postSchema =new mongoose.Schema({
    userId:{
        type:objectId,
        ref:'user',
    },
    postImage:String,
    comment:{
        type:[objectId],
        ref:'comment'
    },
    totalComment:{
        type:Number,
        default:0
    },
    dateTime:String,
    isDeleted:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model("post", postSchema)
