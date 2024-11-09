// import { Button, Container, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommonModal from "../../common/modal";
import postEmployeeData from "../../sevices/addEmployeeData";
import {
  Button,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../utilities/axiosInstance";
import FetchEmployees from "../../utilities/fetchEmployeeData";
import UseFetchEmployees from "../../utilities/fetchEmployeeData";
import Edit from "../../sevices/Edit";
import deleteFunc from "../../sevices/delete";

export default function EmployeeTable() {
  const admin = JSON.parse(localStorage.getItem("adminDetails"));
  // console.log(admin);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [employee, setEmployee] = useState([]);
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(false); // State to handle error message
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [filterData, setFilterDetails] = useState([]);
  const [filterText,setFilterText]=useState("")
  const [final,setFinal]=useState([])
  console.log("filterkey",filterText)

  const [delte, setDelete] = useState(false);
  // Snackb
  // console.log("editformdata", formData);

  const data = UseFetchEmployees([snackbarOpen, delte]);

  useEffect(() => {
    if (data.length > 0) {
      setEmployee(data);
    }
  }, [data, snackbarOpen]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFilterDetails("");
  };

  const handleSubmit = async () => {
    setIsModalOpen(false);
    // setFilterDetails("");

    const response = await postEmployeeData(formData, admin._id);

    // console.log("response", response);

    if (response) {
      setSucess(true);
      setSnackbarMessage("Employee added successfully!");
    } else {
      setError(true);
      setSnackbarMessage("Error adding employee. Please try again.");
      // Open snackbar for error
    }

    setSnackbarOpen(!snackbarOpen);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const fields = [
    { name: "Name", type: "text" },
    { name: "Email", type: "text" },
    { name: "MobileNo", type: "text" },
    {
      name: "Designation",
      type: "dropdown",
      options: ["HR", "Manager", "Sales"],
    },
    { name: "Gender", type: "radio", options: ["M", "F"] },
    { name: "Course", type: "checkbox", options: ["MCA", "BCA", "BSC"] },
    { name: "Img Upload", type: "file" },
  ];

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (ind) => {
   
    const response = await deleteFunc(ind);

    if (response) {
      setSucess(true);
      setSnackbarMessage("Employee deleted successfully!"); 
    } else {
      
      setSucess(false);
      setSnackbarMessage("Error deleting employee. Please try again."); 
    }

   
    setSnackbarOpen(true);
  };

  const handleModalOpenFunc = (id) => {
    // console.log("edit", id);

    const editData = employee.filter((data) => data._id === id);

    setFilterDetails(editData);
    setIsModalOpen(true);
  };

  const onEdit = async (data) => {
    console.log("dataeditpassmodal", data);
    setIsModalOpen(false);

    try {
      const response = await Edit(data); 
      // console.log("response from edit:", response);

      if (response) {
        setSucess(true); 
        setSnackbarMessage("Employee updated successfully!"); 
      } else {
        setError(true); 
        setSnackbarMessage("Error updating employee. Please try again."); 
      }


      setSnackbarOpen(true);
    } catch (error) {
      setError(true);
      setSnackbarMessage("Error updating employee. Please try again.");
      setSnackbarOpen(true);
      console.error("Error during edit:", error);
    }
  };


  const handleFilter = (e) => {
    setFilterText(e.target.value); 
  
   
    const keywords = e.target.value.trim().toLowerCase().split(" ");
  
    
    const result = employee.filter((emp) => {
      
      return keywords.every((keyword) => {
        
        return (
          emp.Name.toLowerCase().includes(keyword) ||
          emp.Email.toLowerCase().includes(keyword) ||
          emp.Designation.toLowerCase().includes(keyword) ||
          emp.MobileNo.includes(keyword) ||
          emp.Gender.toLowerCase().includes(keyword) ||
          emp.Course.toLowerCase().includes(keyword)
        );
      });
    });
  
     console.log("result",result)
 
   setFinal(result);
  };
  
  const displayedData = final.length > 0 ? final : employee;
     
  return (
    <Container>
      <Box display={"flex"} justifyContent={"end"} marginTop={"30px"}>
        <Button variant="outlined" onClick={handleModalOpen}>
          Add Employee
        </Button>
      </Box>

      <Container>
        <Box sx={{ marginTop: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <TextField
              variant="outlined"
              placeholder="Enter search keywords"
              onChange={handleFilter}
            />
          </Box>

          <TableContainer component={Paper} marginTop={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile No</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.length > 0 ? (
                  displayedData.map((emp) => (
                    <TableRow key={emp._id}>
                      <TableCell>
                        <img
                          src={emp.ImagePath}
                          alt={emp.Name}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      </TableCell>
                      <TableCell>{emp.Name}</TableCell>
                      <TableCell>{emp.Email}</TableCell>
                      <TableCell>{emp.MobileNo}</TableCell>
                      <TableCell>{emp.Designation}</TableCell>
                      <TableCell>{emp.Gender}</TableCell>
                      <TableCell>{emp.Course}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton>
                            <EditIcon
                              onClick={() => handleModalOpenFunc(emp._id)}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(emp._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No employee data available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>

      <CommonModal
        isOpen={isModalOpen}
        title={filterData.length > 0 ? "Update Details" : "Add Employee"}
        fields={fields}
        onClose={handleModalClose}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
        formValues={filterData || []}
        onEdit={onEdit}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={sucess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
