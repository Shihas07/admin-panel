import {
  AppBar,
  Box,
  Backdrop,
  Toolbar,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Button,
} from "@mui/material";
import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavBar({ items }) {
  const navigate=useNavigate()
  const adminDetails = JSON.parse(localStorage.getItem("adminDetails"));
  


  console.log(adminDetails);

  const handleLogout=()=>{
       
    localStorage.removeItem("adminDetails");
      navigate("/login")
  }






  return (
    <>
      <Container>
        <AppBar
          position="fixed"
          sx={{
            top: "30px",
            boxShadow: "10px",
            backgroundColor: "#b3f2c4",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            border: "0.5px solid #B0C4DE",

            // boxShadow: "0px 2px 5px rgba(173, 216, 230, 0.6)",
          }}
        >
          <Toolbar>
            <List sx={{ display: "flex", flexDirection: "row", padding: 0 }}>
              {items.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ width: "auto" }}>
                  <ListItemButton component={Link} to={item.path}>
                    <ListItemText
                      primary={item.label}
                      sx={{ color: "white" }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Grid item>
                <Typography variant="h6" sx={{ marginRight: 2 }}>
                 Welocome  {adminDetails.userName}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleLogout} >
                {adminDetails?  "Logout" : "Login"}
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Container>
    </>
  );
}
