import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import Sidebar from "../src/components/Sidebar";
import Navbar from "../src/components/Navbar";
import DocumentsTable from "../src/components/DocumentsTable";
import AddNewDocumentModel from "../src/components/AddNewDocumentModel";

const API = import.meta.env.VITE_BACKEND_URL;

const Documents = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("All Projects");

   useEffect(() => {
    fetchProjects();
    fetchDocuments(); 
    
  }, []);
  const fetchDocuments = async () => {


    setIsLoading(true);
    try {
      const res = await axios.get(`${API}/api/documents`);
      setDocuments(res.data);
    } catch (err) {
      console.error("Error fetching documents:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/api/project`);
      const normalized = res.data.map(p => ({
        ...p,
        projectName: p.projectName || p.projectname || "Unknown",
      }));
      setProjects(normalized);
    } catch (err) {
      console.error(err);
    }
  };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDocumentAdded = () => {
    fetchDocuments();
   
  };
   const deleteDocument = async (id) => {
  if (!window.confirm("Are you sure you want to delete this document?")) return;

  try {
    await axios.delete(`${API}/api/documents/${id}`);
    // Refresh the list
    fetchDocuments();
  } catch (err) {
    console.error("Error deleting document:", err);
    alert("Failed to delete document.");
  }
};

  return (
    <div className="flex h-screen bg-gray-50">
     <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Documents Overview
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              <Plus size={20} />
              Add Document
            </button>
          </header>

           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <div className="flex items-center gap-2 ">
              <span className="text-gray-600 font-medium">Filter by :</span>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="border rounded-lg px-2 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option>All Projects</option>
                {projects.map((p) => (
                  <option key={p.project_id} value={p.projectName}>{p.projectName}</option>
                ))}
              </select>

              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="border rounded-lg px-2 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option>All Types</option>
                {projects.map((p) => (
                  <option key={p.project_id} value={p.projectName}>{p.projectName}</option>
                ))}
              </select>
            </div>
            
          </div>

          {isLoading ? (
            <div className="text-center p-10 text-gray-500">Loading documents...</div>
          ) : (
            <DocumentsTable documents={documents} onDelete={deleteDocument} selectedProject={selectedProject}/>

          )}
        </main>
      </div>

      {isModalOpen && (
        <AddNewDocumentModel
          onClose={() => setIsModalOpen(false)}
          onDocumentAdded={handleDocumentAdded}
        />
      )}
    </div>
  );
};

export default Documents;
