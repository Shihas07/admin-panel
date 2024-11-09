import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../componenets/admin/login";
import Home from "../pages/home";
import AdminLayout from "../layout/AdminLayout";
import Employee from "../pages/employee";

export default function AdminRoute() {
  return (
    <Routes>
      <Route element={<AdminLayout/>}>

    
    <Route path="/" element={<Home />} />
    <Route path="/employelist" element={<Employee/>}/>
    </Route>
   
  </Routes>
  );
}
