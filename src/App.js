import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import Like from "./Pages/Like/Like.js";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  return (
    <div className="App bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/like" element={<Like />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
