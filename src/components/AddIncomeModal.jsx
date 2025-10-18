import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API = import.meta.env.VITE_BACKEND_URL;

export default function AddIncomeModal({ onClose, onIncomeAdded, projects, activeTab }) {
  const [formData, setFormData] = useState({
    project_id: "",
    client_name: "",
    amount: "",
    date_received: "",
    payment_mode: "Bank Transfer",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        activeTab === "expense"
          ? `${API}/api/finance/expense/add`
          : `${API}/api/finance/income/add`;

      await axios.post(endpoint, formData);
      onIncomeAdded();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 overflow-y-auto max-h-[90vh]"
          initial={{ scale: 0.9, opacity: 0, y: -40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -40 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === "expense" ? "Add Expense" : "Add Income"}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="project_id"
              value={formData.project_id}
              onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
              required
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p.project_id} value={p.project_id}>{p.projectname}</option>
              ))}
            </select>

            <input type="text" placeholder="Client Name" value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150" required />

            <input type="number" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150" required />

            <input type="date" value={formData.date_received} onChange={(e) => setFormData({ ...formData, date_received: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150" required />

            <select value={formData.payment_mode} onChange={(e) => setFormData({ ...formData, payment_mode: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150">
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>Cheque</option>
            </select>

            <textarea placeholder="Notes (optional)" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"></textarea>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-150">Cancel</button>
              <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all duration-150">
                {activeTab === "expense" ? "Add Expense" : "Add Income"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
