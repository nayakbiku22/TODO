import { API_URL } from "./Utils"


export const CreateTask=async(taskObj)=>{
    const url=`${API_URL}/tasks`;
    const options={
        method:'POST',
        headers:{
            'content-Type':'application/json'
        },
        body:JSON.stringify(taskObj)
    };
    try {
        const result=await fetch(url,options)
        const data=await result.json();
        return data;
    } catch (error) {
        return error;
    }

}
export const GetAllTask=async()=>{
    const url=`${API_URL}/tasks`;
    const options={
        method:'GET',
        headers:{
            'content-Type':'application/json'
        },
    };
    try {
        const result=await fetch(url,options)
        const data=await result.json();
        return data;
    } catch (error) {
        return error;
    }

}
export const DeleteTask=async(id)=>{
    const url=`${API_URL}/tasks/${id}`;
    const options={
        method:'DELETE',
        headers:{
            'content-Type':'application/json'
        },
    };
    try {
        const result=await fetch(url,options)
        const data=await result.json();
        return data;
    } catch (error) {
        return error;
    }

}
export const UpdateTask=async(id,reqBody)=>{
    const url=`${API_URL}/tasks/${id}`;
    const options={
        method:'PUT',
        headers:{
            'content-Type':'application/json'
        },
        body:JSON.stringify(reqBody)
    };
    try {
        const result=await fetch(url,options)
        const data=await result.json();
        return data;
    } catch (error) {
        return error;
    }

}