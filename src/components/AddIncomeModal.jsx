import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

export default function AddIncomeModal({ onClose, onIncomeAdded, projects }) {
  const [form, setForm] = useState({
    project_name: "",
    client_name: "",
    amount: "",
    date_received: "",
    payment_mode: "",
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/finance/add`, form);
      alert("✅ Income record added successfully!");
      onIncomeAdded();
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add income record.");
    }
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={handleBackdrop}
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
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl sm:max-w-sm mt-20 mx-4 relative"
          initial={{ y: -60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 140, damping: 16 }}
        >
          <header className="p-6 border-b border-gray-200 relative">
            <h2 className="text-xl font-semibold text-gray-900">Add Income</h2>
            <p className="text-sm text-gray-500 mt-1">
              Record new income details for a project
            </p>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>
          </header>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label>Project</label>
                <select
                  name="project_name"
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
              <div>
                <label>Client Name</label>
                <input
                  type="text"
                  name="client_name"
                  value={form.client_name}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  required
                />
              </div>
              <div>
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  required
                />
              </div>
              <div>
                <label>Date Received</label>
                <input
                  type="date"
                  name="date_received"
                  value={form.date_received}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  required
                />
              </div>
              <div>
                <label>Payment Mode</label>
                <select
                  name="payment_mode"
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Mode</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Check">Check</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div>
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  placeholder="Optional notes..."
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
                Save Income
              </button>
            </footer>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
