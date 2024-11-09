import axiosInstance from "../utilities/axiosInstance";


     

   const fetchData=async(id)=>{
       
    const response=  await   axiosInstance.get(`/employeeFetch/${id}`)
        
       return response.data
   }

   export default fetchData