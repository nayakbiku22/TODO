import { toast } from "react-toastify";
export const API_URL="https://todo-api-pearl-seven.vercel.app";
export const notify=(message,type)=>{
    toast[type](message)
}
