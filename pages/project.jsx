import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
// Assuming you have a standard layout components
import Sidebar from "../src/components/Sidebar";
import Navbar from "../src/components/Navbar"; 
import ProjectsTable from "../src/components/ProjectsTable";
import AddNewProjectModal from "../src/components/AddNewProjectModal"; // Your modal
const API = import.meta.env.VITE_BACKEND_URL;
const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch project data from the backend
    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`{API}/api/project`);
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 1. Fetch data on component mount (initial load/refresh)
    useEffect(() => {
        fetchProjects();
    }, []); 

    // 2. Function passed to the modal to refresh data after new project is created
    const handleProjectAdded = () => {
        fetchProjects(); // Re-fetch the entire list to include the new project
    };

    return (
        <div className="flex h-screen bg-gray-50">
           
            <Sidebar /> 
          

            <div className="flex-1 flex flex-col overflow-x-hidden">
                    <Navbar />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Projects Overview</h1>
                        
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md"
                        >
                            <Plus size={20} />
                            Add Project
                        </button>
                    </header>

                    {isLoading ? (
                        <div className="text-center p-10 text-gray-500">Loading projects...</div>
                    ) : (
                        // Pass the fetched project data to the table component
                        <ProjectsTable projects={projects} />
                    )}

                </main>
            </div>

            {/* Render Modal conditionally */}
            {isModalOpen && (
                <AddNewProjectModal 
                    onClose={() => setIsModalOpen(false)}
                    // Pass the refresh function here
                    onProjectAdded={handleProjectAdded} 
                />
            )}
        </div>
    );
};

export default Projects;