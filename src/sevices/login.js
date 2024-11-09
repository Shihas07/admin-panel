

  import axiosInstance from "../utilities/axiosInstance";



  const PostLogin=async(data)=>{

    console.log("datafromaxios",data)
      
  const response =await  axiosInstance.post("/logindata",data)
  return response.data

  console.log("fromaxios",response)
  }

  export default PostLogin