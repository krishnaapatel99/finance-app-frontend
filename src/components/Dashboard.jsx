import React, { useState, useEffect } from 'react';
import { CalendarDays, Plus } from "lucide-react";
import axios from 'axios';
import Sidebar from "./Sidebar"; // Assuming these exist
import Navbar from "./Navbar"; // Assuming these exist
import StatCard from "./StatCard";


// Helper function to format date for display
const formatDisplayDate = (dateString) => {
    if (!dateString) return 'N/A';
    // Example: "Thursday, Nov 10th"
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
};

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // New state for upcoming events
    const [upcomingProject, setUpcomingProject] = useState(null); 

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Fetch Upcoming Project
    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/upcomingevents");
                // The backend returns an array; we take the first one
                setUpcomingProject(response.data[0]); 
            } catch (error) {
                console.error("Error fetching upcoming events:", error);
            }
        };
        fetchUpcoming();
    }, []);

    const project = upcomingProject; // Simplify usage

  return (
    <div className="flex h-screen bg-gray-50"> 
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-x-hidden">
            
            {/* Navbar (Header) */}
            <Navbar toggleSidebar={toggleSidebar} />

            {/* Dashboard Content Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                
                {/* Responsive Title and Description */}
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 mt-4 md:mt-0">Dashboard</h1>
                <p className="text-sm md:text-lg text-gray-500 mb-8">Welcome back! Here's your business overview.</p>

                {/* Stats Grid - Now connected to live data */}
                <StatCard/>

                {/* Upcoming Event Card (Dynamic) */}
                <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 md:p-8 border border-gray-100">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-indigo-600 flex items-center gap-2">
                        <CalendarDays size={24} /> Upcoming Focus
                    </h2>
                    {project ? (
                        <div className="border border-indigo-200 bg-indigo-50/50 rounded-xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition-all duration-300">
                            <div className="mb-4 md:mb-0">
                                <p className="text-lg md:text-xl font-semibold text-slate-800">{project.projectname}</p>
                                <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                                    {/* Use fetched data */}
                                    <span>Client: {project.clientname}</span> | 
                                    <span>Start Date: {formatDisplayDate(project.startdate)}</span>
                                </div>
                                <p className="text-xs md:text-sm text-gray-500 mt-1">Starting soon. Review requirements with the assigned team.</p>
                            </div>
                            <div className="text-right flex flex-col items-start md:items-end w-full md:w-auto">
                                <span className="bg-indigo-200 text-indigo-700 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider self-start md:self-auto">
                                    Planned
                                </span>
                                <button className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md w-full md:w-auto">
                                    View Project
                                </button>
                            </div>
                        </div>  
                    ) : (
                         <div className="text-center p-8 border border-gray-200 rounded-xl text-gray-500">
                            No upcoming projects currently planned.
                        </div>
                    )}
                </div>
                
                {/* Floating Action Button (FAB) */}
                <button className="
                    fixed bottom-4 right-4 
                    bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                    text-white 
                    h-12 w-12 rounded-full flex items-center justify-center 
                    shadow-2xl hover:shadow-3xl transition-all duration-200 z-50
                    touch-manipulation 
                ">
                    <Plus size={30} />
                </button>
            </main>
        </div>
    </div>
  )
}

export default Dashboard