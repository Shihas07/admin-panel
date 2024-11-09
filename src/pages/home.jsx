import React, { StrictMode } from "react";
import NavBar from "../componenets/admin/navBar";
import { Container } from "@mui/material";
import img from "../assets/istockphoto-1053908156-612x612.jpg"
export default function Home() {
  return (
    <>
    <Container  maxWidth="sm" >
    
         <img src={img}  alt="hello" style={{width:"90%"}} />
    
    </Container>
    </>
  );
}
