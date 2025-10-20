import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

const AddNewProjectModal = ({ onClose, onProjectAdded, editingProject }) => {
  const isEditing = !!editingProject; // 🆕 detect mode

  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    startDate: "",
    endDate: "",
    status: "Planned",
    assignedTeam: "",
    budget: "0.00",
  });

  // 🆕 Prefill data if editing
  useEffect(() => {
    if (editingProject) {
      setFormData({
        projectName: editingProject.projectname || "",
        clientName: editingProject.clientname || "",
        startDate: editingProject.startdate
          ? editingProject.startdate.split("T")[0]
          : "",
        endDate: editingProject.enddate
          ? editingProject.enddate.split("T")[0]
          : "",
        status: editingProject.status || "Planned",
        assignedTeam: editingProject.assignedteam || "",
        budget: editingProject.budget || "0.00",
      });
    }
  }, [editingProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🆕 Submit logic (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `${API}/api/project/update-project/${editingProject.project_id}`,
          formData
        );
        alert("✅ Project updated successfully!");
      } else {
        await axios.post(`${API}/api/project/create-project`, formData);
        alert("✅ Project created successfully!");
      }

      onProjectAdded();
      onClose();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("❌ Failed to save project");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={handleBackdropClick}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl sm:max-w-sm mt-10 mx-4 border border-white/40 
          max-h-[90vh] flex flex-col"
          initial={{ y: -60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 140, damping: 16 }}
        >
          <header className="p-6 border-b border-gray-200 relative">
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditing ? "Edit Project" : "Add New Project"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEditing
                ? "Update project details below."
                : "Fill in the details to create a new project."}
            </p>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>
          </header>

          <form onSubmit={handleSubmit} className="p-4 space-y-5 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Project Name", name: "projectName", type: "text" },
                { label: "Client Name", name: "clientName", type: "text" },
                { label: "Start Date", name: "startDate", type: "date" },
                { label: "End Date", name: "endDate", type: "date" },
              ].map((f) => (
                <div key={f.name}>
                  <label>{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                    required={f.name === "projectName" || f.name === "clientName"}
                  />
                </div>
              ))}

              <div>
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Planned">Planned</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div>
                <label>Assigned Team</label>
                <input
                  type="text"
                  name="assignedTeam"
                  value={formData.assignedTeam}
                  onChange={handleChange}
                  placeholder="Assigned Team"
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label>Budget</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Budget"
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <footer className="pt-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-md"
              >
                {isEditing ? "Update Project" : "Create Project"}
              </button>
            </footer>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddNewProjectModal;
