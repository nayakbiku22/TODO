import React, { useEffect, useState } from 'react'
import { FaPlus, FaCheck, FaTrash, FaPencilAlt } from "react-icons/fa"
import { ToastContainer } from "react-toastify"
import { CreateTask, DeleteTask, GetAllTask, UpdateTask } from './Api'
import { notify } from './Utils'
function TaskManager() {
    const [input,setInput]=useState('')
    const [task,setTask]=useState([])
    const [update,setUpdate]=useState(null)

    const handleTask=()=>{
        if(update && input){
            const obj={
                name:input,
                isDone:update.isDone,
                _id:update._id
            }
            handleUpdate(obj);
        }else if(update===null && input){
            handleAddTask();
        }
    }
useEffect(()=>{
  if(update){
    setInput(update.name)
  }
},[update])

    const handleAddTask=async()=>{
        const obj={
            name:input,
            isDone:false
        }
        try {
            const {message,success}=await CreateTask(obj)
            if(success){
                notify(message,'success')
            }else{
                notify(message,'error')
            }
            fetchAllTask()
        } catch (error) {
            notify('Failed to create task','error')
        }
        setInput('')
    }

    const fetchAllTask=async()=>{
        try {
            const {message,success,data}=await GetAllTask()
            setTask(data)
        } catch (error) {
            notify('Failed to fetch tasks','error')
        }
    }

    const handleDeleteTask=async(id)=>{
        try {
            const {success,message}=await DeleteTask(id)
            if(success){
                notify(message,'success')
            }else{
                notify(message,'error')
            }
            fetchAllTask()
        } catch (error) {
            notify('Failed to delete task','error')
        }
       

    }
   const handleCheckAndUncheck=async(item)=>{
      const {_id,isDone,name}=item;
      const obj={
        name,
        isDone:!isDone
      }
      try {
        const {success,message}=await UpdateTask(_id,obj)
        if(success){
            notify(message,'success')
        }else{
            notify(message,'error')
        }
        fetchAllTask()
    } catch (error) {
        notify('Failed to delete task','error')
    }
   }
   
   const handleUpdate=async(item)=>{
    const {_id,isDone,name}=item;
    const obj={
      name:name,
      isDone:isDone
    }
    try {
      const {success,message}=await UpdateTask(_id,obj)
      if(success){
          notify(message,'success')
      }else{
          notify(message,'error')
      }
      setInput('')
      setUpdate(null)
      fetchAllTask()
  } catch (error) {
      notify('Failed to delete task','error')
  }
   }
    useEffect(()=>{
        fetchAllTask()
    },[])
    return (
        <div className='flex flex-col items-center w-96 m-auto'>
            <h1 className='mb-6 font-semibold text-3xl'>Todo List</h1>
            <div className='flex flex-row justify-between items-center mb-10 '>
                <div >
                    <input
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                     className='border-2 border-black h-8 text-center w-80' type="text" placeholder='Add a new task' />
                </div>
                <div className='bg-green-500 flex items-center justify-center h-8 w-9 text-white  font-medium ml-1 rounded-md'>
                    <button
                    onClick={handleTask}
                    ><FaPlus /></button>
                </div>
            </div>
            {/* task list */}
            <div className=' flex flex-col w-[390px]'>
                {task.map((item)=>(
                     <div key={item._id} className='bg-gray-200 flex m-2 p-2 border-2 rounded-sm justify-between'>
                     <span className= {item.isDone?'line-through':''}>{item.name}</span>
                     <div className='flex '>
                         <div className='bg-green-500 text-white h-8 w-8 flex justify-center items-center mr-2 rounded-md'>
                             <button
                              onClick={()=>handleCheckAndUncheck(item)}
                                 type='button'
                             ><FaCheck /></button>
                         </div>
                         <div className='bg-cyan-400 text-white h-8 w-8 flex justify-center items-center mr-2 rounded-md'>
                             <button
                             onClick={()=>setUpdate(item)}
                                 type='button'
                             ><FaPencilAlt /></button>
                         </div>
                         <div className='bg-amber-500 text-white h-8 w-8 flex justify-center items-center mr-1 rounded-md'>
                             <button
                               onClick={()=>handleDeleteTask(item._id)}
                                 type='button'
                             ><FaTrash /></button>
                         </div>
                     </div>
 
                 </div>
                ))}
               
            </div>

            {/* toastify */}
            <ToastContainer
              position='top-right'
              autoClose={3000}
              hideProgressBar={false}
            />
        </div>
    )
}

export default TaskManager
