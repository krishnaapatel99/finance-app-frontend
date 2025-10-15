import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
const API = import.meta.env.VITE_BACKEND_URL;
const AddNewProjectModal = ({ onClose, onProjectAdded }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    startDate: "",
    endDate: "",
    status: "Planned",
    assignedTeam: "",
    budget: "0.00",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/create-project`, formData);
      alert("✅ Project Created Successfully!");
      onProjectAdded();
      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create project");
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        onClick={handleBackdropClick}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Modal Container */}
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl sm:max-w-sm mt-20 mx-4 relative backdrop-blur-xl bg-opacity-95 border border-white/40"
          initial={{ y: -60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 140, damping: 16 }}
        >
          {/* Header */}
          <header className="p-6 border-b border-gray-200 relative">
            <h2 className="text-xl font-semibold text-gray-900">
              Add New Project
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Create a new project by filling in the details below
            </p>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              &times;
            </button>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Use single-column on small screens and 2-column on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label>Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="Project Name"
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label>Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Client Name"
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
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

            {/* Footer */}
            <footer className="pt-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-150 shadow-md"
              >
                Create Project
              </button>
            </footer>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddNewProjectModal;
