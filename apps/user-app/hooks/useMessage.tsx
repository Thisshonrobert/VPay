import { toast } from "react-toastify";

export const useMessage=()=>{



    function error(msg:string){
        toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
            });
    }
    function success(msg:string){
        toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
            });
    }

    function bark(res:{message:string;success:boolean}|undefined){
        if(!res) return ;
        if(res.success){
         
            success(res.message)
        }else{
            error(res.message)
        }
     }

    return {bark}


}