
import  { useState,useEffect } from 'react'


const useDebounce = (value: string, delay: number) => {
    const [debounce,setDebouce] = useState(value)
    useEffect(()=>{
        const id = setTimeout(()=>{
            setDebouce(value)
        },delay)
        return ()=> clearTimeout(id);
    },[value,delay])
    return debounce;
}

export default useDebounce
