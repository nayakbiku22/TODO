const { createTask, fetchAllTask,updateTask, deleteTask } = require('../controllers/TaskController');

const router=require('express').Router();


//to create  the ask
router.post('/',createTask)
//to get the task
router.get('/',fetchAllTask)
//to update the task
router.put('/:id',updateTask)
//to delete the task
router.delete('/:id',deleteTask)

module.exports=router;