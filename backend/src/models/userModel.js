const mongoose =require('mongoose')
const objectId= mongoose.Schema.Types.ObjectId

const userSchema =new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    posts:{
        type:[objectId],
        ref:'post'
    }
})

module.exports = mongoose.model("user", userSchema)
