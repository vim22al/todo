const userTodoController=require('../controllers/userTodo.controller');
const express=require('express');
const router=express.Router();

router.post('/todo/api/v1/create', userTodoController.signup);
router.get('/todo/api/v1/get', userTodoController.signin);
router.put('/todo/api/v1/update/:id', userTodoController.update);
router.get('/todo/api/v1/getAllTodo', userTodoController.getAllTodo);

module.exports=router;