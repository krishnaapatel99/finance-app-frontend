import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API = import.meta.env.VITE_BACKEND_URL;

export default function AddIncomeModal({ onClose, onIncomeAdded, projects, activeTab, editingRecord }) {
  const [formData, setFormData] = useState({
    project_id: "",
    client_name: "",
    amount: "",
    date_received: "",
    payment_mode: "Bank Transfer",
    notes: "",
  });

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        project_id: editingRecord.project_id,
        client_name: editingRecord.client_name,
        amount: editingRecord.amount,
        date_received: editingRecord.date_received,
        payment_mode: editingRecord.payment_mode,
        notes: editingRecord.notes || "",
      });
    }
  }, [editingRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRecord) {
        await axios.put(`${API}/api/finance/update/${editingRecord.finance_id}`, {
          ...formData,
          type: activeTab,
        });
      } else {
        await axios.post(`${API}/api/finance/add`, { ...formData, type: activeTab });
      }

      onIncomeAdded();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 overflow-y-auto max-h-[90vh]" initial={{ scale: 0.9, opacity: 0, y: -40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: -40 }} transition={{ type: "spring", stiffness: 160, damping: 18 }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">{editingRecord ? "Edit Record" : activeTab === "expense" ? "Add Expense" : "Add Income"}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <select value={formData.project_id} onChange={e => setFormData({ ...formData, project_id: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" required>
              <option value="">Select Project</option>
              {projects.map(p => <option key={p.project_id} value={p.project_id}>{p.projectname}</option>)}
            </select>

            <input type="text" placeholder="Client Name" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" value={formData.client_name} onChange={e => setFormData({ ...formData, client_name: e.target.value })} required />
            <input type="number" placeholder="Amount" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} required />
            <input type="date" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" value={formData.date_received} onChange={e => setFormData({ ...formData, date_received: e.target.value })} required />

            <select value={formData.payment_mode} onChange={e => setFormData({ ...formData, payment_mode: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>Cheque</option>
            </select>

            <textarea placeholder="Notes (optional)" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}></textarea>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">Cancel</button>
              <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">{editingRecord ? "Update" : activeTab === "expense" ? "Add Expense" : "Add Income"}</button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
