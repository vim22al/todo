const mongoose=require('mongoose');

const userTodoSchema= mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        default:()=>{
            return Date.now();
        },
        immutable:true
    },
    updatedAt:{
        type:String,
        default:()=>{
            return Date.now();
        }
    }
})

module.exports=mongoose.model('todo', userTodoSchema);