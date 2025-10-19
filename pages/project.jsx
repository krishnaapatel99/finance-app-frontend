import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import Sidebar from "../src/components/Sidebar";
import Navbar from "../src/components/Navbar";
import ProjectsTable from "../src/components/ProjectsTable";
import AddNewProjectModal from "../src/components/AddNewProjectModal";

const API = import.meta.env.VITE_BACKEND_URL;

const Projects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null); // 🆕 for edit mode

  // Fetch all projects
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API}/api/project`);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleProjectAddedOrUpdated = () => {
    fetchProjects();
  };

  // 🆕 When edit button clicked
  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Projects Overview
            </h1>

            <button
              onClick={handleAddProject}
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              <Plus size={20} />
              Add Project
            </button>
          </header>

          {isLoading ? (
            <div className="text-center p-10 text-gray-500">
              Loading projects...
            </div>
          ) : (
            <ProjectsTable
              projects={projects}
              onEditProject={handleEditProject} // 🆕 pass edit handler
            />
          )}
        </main>
      </div>

      {isModalOpen && (
        <AddNewProjectModal
          onClose={() => setIsModalOpen(false)}
          onProjectAdded={handleProjectAddedOrUpdated}
          editingProject={editingProject} // 🆕 pass project if editing
        />
      )}
    </div>
  );
};

export default Projects;
