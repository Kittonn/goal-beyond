import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProtectProfile from "./components/ProtectProfile";
import ProtectHome from "./components/ProtectHome";

const App: React.FC = () => {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Routes>
        <Route element={<ProtectHome />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<ProtectProfile />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
