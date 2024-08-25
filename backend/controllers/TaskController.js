const dbModel = require("../models/model");


const createTask=async(req,res)=>{
     const data=req.body;
     try {
        const model=new dbModel(data)
         await model.save()
         res.status(201)
         .json({message:"Task is created",success:true})
     } catch (error) {
        res.status(500).json({message:"Failed to create Task",success:false});
     }
}
const fetchAllTask=async(req,res)=>{
     try {
        const data=await dbModel.find({})
         res.status(201)
         .json({message:"Task is fetched",success:true,data})
     } catch (error) {
        res.status(500).json({message:"Failed to get Task",success:false});
     }
}
const updateTask=async(req,res)=>{
     try {
        const id=req.params.id
        const body=req.body
        const obj={$set:{...body}}
        await dbModel.findByIdAndUpdate(id,obj)
         res.status(200)
         .json({message:"Task updated",success:true})
     } catch (error) {
        res.status(500).json({message:"Failed to update Task",success:false});
     }
}
const deleteTask=async(req,res)=>{
     try {
        const id=req.params.id
        await dbModel.findByIdAndDelete(id)
         res.status(200)
         .json({message:"Task deleted",success:true})
     } catch (error) {
        res.status(500).json({message:"Failed to delete Task",success:false});
     }
}
module.exports={createTask,fetchAllTask,updateTask,deleteTask}