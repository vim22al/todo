const Todo=require('../models/usertodo.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('../configs/secretKey');

exports.signup= async(req,res)=>{
    const body=req.body;
    const todoObj={
        id:body.id,
        email:body.email,
        name:body.name,
        password:bcrypt.hashSync(body.password,10)
    }
    try {
        const todo=await Todo.create(todoObj)
       return res.status(201).send(todo);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message:'internal server error!'
        })
    }

}

exports.signin=async(req,res)=>{
    const body=req.body;
    try {
        const todo= await Todo.findOne({id:body.id})

        const token=jwt.sign({id: todo.id}, config.secretKey,{ expiresIn:86400});
        return res.status(200).send({
            id:todo.id,
            name:todo.name,
            email:todo.email,
            accessToken:token
        })
    } catch (error) {
        return res.status(500).send({
            message:'internal server error!'
        })
    }
}

exports.update= async(req,res)=>{
    const body=req.body;
    try {
        const userTodo= await Todo.findOne({_id:req.params.id})
        if(!userTodo){
            return res.status(404).send({
                message:"userTodo in not present"
            })
        }
        if(body.id){
            userTodo.id=body.id
        }
        if(body.name){
            userTodo.name=body.name
        }
        if(body.password){
            userTodo.password=bcrypt.hashSync(body.password,10)
        }
        userTodo.save();
        return res.status(200).send({
            message:"update successfully!"
        });
    } catch (error) {
        return res.status(500).send({
            message:'internal server error!'
        });
    }
}

exports.getAllTodo= async(req,res)=>{
    const body=req.body;
    const reqData={};
    if(body.id){
        reqData.id=body.id
    }
    try {
        const todo= await Todo.find(reqData);
        return res.status(200).send(todo);
    } catch (error) {
        return res.status(500).send({
            message:'internal server error!'
        })
    }
}