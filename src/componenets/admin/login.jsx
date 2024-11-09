import {
  Box,
  Container,
  Paper,
  TextField,
  Toolbar,
  Typography,
  Button,
  Alert


} from "@mui/material";
import React, { useEffect, useState } from "react";
import PostLogin from "../../sevices/login";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate=useNavigate()
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState({
    userName: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const [data, setData] = useState([]);

  console.log("data", data);

  // console.log(loginData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    let errors = { ...error };

    if (name === "userName") {
      errors.userName =
        value.length < 3 ? "At least three characters required." : "";
    }

    if (name === "password") {
      errors.password =
        value.length < 6 ? "At least six characters required." : "";
    }

    setError(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    if (loginData.userName.length < 3) {
      errors.userName = "check ypur userName";
    }

    if (loginData.password.length < 6) {
      errors.password = "password must contain 6 numbers";
    }

    setError(errors);

    if (!errors.userName && !errors.password) {
      setData(loginData);
    }
  };

  const loginFunc = async () => {
    try {
      const response = await PostLogin(data);
      console.log("response", response);

      if (response.message === "Login successful") {

        localStorage.setItem("adminDetails", JSON.stringify(response.admin));
          console.log('success ',snackbar);
          
        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

      

          setTimeout(()=>{
             navigate("/")
          },2000)




      } else if (response.data.message === "invalid user") {
        setSnackbar({
          open: true,
          message: "Check username or password",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setSnackbar({
        open: true,
        message: "Check username or password",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (data.userName && data.password) {
      loginFunc();
    }
  }, [data]);

  return (
    <Container maxWidth="xs">
      <Paper elevation={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: 3,
            gap: 2,
          }}
        >
          <Typography variant="h3" fontFamily="-apple">
            Login Page
          </Typography>
          <Toolbar />
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              name="userName"
              error={Boolean(error.userName)}
              helperText={error.userName}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              name="password"
              error={Boolean(error.password)}
              helperText={error.password}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{ bgcolor: "#65c761" }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
