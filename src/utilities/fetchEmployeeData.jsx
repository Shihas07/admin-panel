import { useEffect, useState } from "react";
import fetchData from "../sevices/fetchEmployee";

const UseFetchEmployees = (deps = []) => {
  console.log("customdeps",deps)
  const adminData = JSON.parse(localStorage.getItem("adminDetails"));

  const [employeeData, setEmployeeData] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    if (adminData) {
      setId(adminData._id);
    }
  }, [adminData]);

  useEffect(
    () => {
      if (id) {
        findData(id);

        
      }
    },
    deps ? [id, ...deps] : [id]
  );

  const findData = async (id) => {
    try {
      const response = await fetchData(id);

      if (response) {
        setEmployeeData(response);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  return employeeData;
};

export default UseFetchEmployees;
