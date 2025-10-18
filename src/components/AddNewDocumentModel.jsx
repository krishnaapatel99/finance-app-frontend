import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

const AddNewDocumentModel = ({ onClose, onDocumentAdded }) => {
  const [formData, setFormData] = useState({
    file_url: "",
    type: "",
    project: "",
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API}/api/project`);
        setProjects(res.data);
      } catch (err) {
        console.error("Error loading projects:", err);
      }
    };
    fetchProjects();
  }, []);
  

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`${API}/api/documents/add`,  {
      file_url: formData.file_url,
      type: formData.type,
      project: formData.project,
    });
      alert("✅ Document uploaded successfully!");
      onDocumentAdded();
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload document");
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
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl sm:max-w-sm mt-20 mx-4 relative"
          initial={{ y: -60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 140, damping: 16 }}
        >
          <header className="p-6 border-b border-gray-200 relative">
            <h2 className="text-xl font-semibold text-gray-900">
              Upload New Document
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Upload invoices, contracts, receipts, or other documents
            </p>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              &times;
            </button>
          </header>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label>File</label>
               <input
    type="url"
    name="file_url"
    placeholder="https://example.com/document.pdf"
    onChange={handleChange}
    className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
    required
  />
              </div>
              <div>
                <label>Document Type</label>
                <select
                  name="type"
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Invoice">Invoice</option>
                  <option value="Contract">Contract</option>
                  <option value="Receipt">Receipt</option>
                </select>
              </div>
              <div>
                <label>Linked Project</label>
                <select
                  name="project"
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Project</option>
                  {projects.map((p) => (
                    <option key={p.project_id} value={p.projectname}>
                      {p.projectname}
                    </option>
                  ))}
                </select>
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
                Upload
              </button>
            </footer>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddNewDocumentModel;
