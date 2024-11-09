import axiosInstance from "../utilities/axiosInstance";

const Edit = async (formData) => {
  console.log("dataFromEDit", formData);

  try {
    const formDataToSend = new FormData();

    if (formData["Img Upload"]) {
      formDataToSend.append("Img Upload", formData["Img Upload"]);
    }

    Object.keys(formData).forEach((key) => {
      if (key !== "Img Upload") {
        formDataToSend.append(key, formData[key]);
      }
    });

    console.log("formDataToSend", formDataToSend);

    const response = await axiosInstance.post("/Edit", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding employee data:", error);
    throw error;
  }
};

export default Edit;
