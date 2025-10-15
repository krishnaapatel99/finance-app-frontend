import React from "react";
import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Dashboard from './src/components/Dashboard'
import Project from './pages/project'


const App = () => {
    // State to manage the visibility of the mobile sidebar
    

   

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/project" element={<Project/>} />

            </Routes>
           
           
        </div>
    );
};

export default App;
