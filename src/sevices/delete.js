import axiosInstance from "../utilities/axiosInstance";


  const deleteFunc = async(id)=>{
       console.log("idxiosdelete",id)
    const response = await axiosInstance.delete(`/delete/${id}`);

    return response
  }
  export default deleteFunc