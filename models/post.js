// imported mongoose
const mongoose = require('mongoose');


// the post schema
const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    decs:{
        type:String,
        max:100,
    },
    img:{
        type:String,
    },
    likes:{
        type:Array,
        default:[]
    }
},{timestamps:true});


module.exports = mongoose.model("Posts",postSchema);
