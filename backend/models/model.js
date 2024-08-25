const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Todo=new Schema({
    name:{
        type:String,
        required:true,
    },
    isDone:{
        type:Boolean,
        required:true,
    }
})

const dbModel=mongoose.model('todos',Todo);
module.exports=dbModel;