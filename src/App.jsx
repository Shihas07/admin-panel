import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./componenets/admin/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from "./routes/adminRoute";
import ProtectRoute from "./common/protectRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
        <Route path="login" element={<Login />} />
        <Route
            path="/*"
            element={
              <ProtectRoute>
                <AdminRoute />
              </ProtectRoute>
            }
          />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
