import React from "react";
import NavBar from "../componenets/admin/navBar";
import { Outlet } from 'react-router-dom';


export default function AdminLayout() {
  const navItems = [
    { label: "Home", path: "/" },
    {
      label: "employelist",
      path: "/employelist",
    },
  ];

  return (
    <div>
      <div><NavBar items={navItems} /></div>

      <div style={{ padding: '20px', marginTop: '80px' }}>
        <Outlet />
      </div>
       
     
      
    </div>
  );
}
