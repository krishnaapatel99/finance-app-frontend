import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API = import.meta.env.VITE_BACKEND_URL;

export default function AddIncomeModal({
  onClose,
  onIncomeAdded,
  projects,
  activeTab, // "income" or "expense"
}) {
  const [formData, setFormData] = useState({
    project_id: "",
    client_name: "",
    amount: "",
    date_received: "",
    payment_mode: "Bank Transfer",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("=== Submitting Form ===");
  console.log("Active Tab:", activeTab);
  console.log("Form Data BEFORE conversion:", formData);

  // --- Basic Validation ---
  if (!formData.project_id) return alert("Please select a project.");
  if (!formData.client_name) return alert("Please enter client name.");
  if (!formData.amount || Number(formData.amount) <= 0)
    return alert("Please enter a valid amount.");
  if (!formData.date_received) return alert("Please select a date.");

  const endpoint =
    activeTab === "expense"
      ? `${API}/api/finance/expense/add`
      : `${API}/api/finance/income/add`;

  // Convert amount to number
  const payload = { ...formData, amount: Number(formData.amount) };

  console.log("Endpoint:", endpoint);
  console.log("Payload (converted amount):", payload);

  try {
    setLoading(true);
    const res = await axios.post(endpoint, payload);
    console.log("Response status:", res.status);
    console.log("Response data:", res.data);

    if (res.status === 201 || res.status === 200) {
      alert(`${activeTab === "expense" ? "Expense" : "Income"} added successfully!`);
      onIncomeAdded();
      onClose();
    } else {
      alert("Failed to add. Check console for details.");
    }
  } catch (err) {
    console.error("Error adding data:", err.response || err);
    alert(
      `Failed to add ${activeTab === "expense" ? "expense" : "income"}.\n` +
        (err.response?.data?.message || err.message)
    );
  } finally {
    setLoading(false);
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
          {/* Title */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === "expense" ? "Add Expense" : "Add Income"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              &times;
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="project_id"
              value={formData.project_id}
              onChange={(e) =>
                setFormData({ ...formData, project_id: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
              required
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p.project_id} value={p.project_id}>
                  {p.projectname}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Client Name"
              value={formData.client_name}
              onChange={(e) =>
                setFormData({ ...formData, client_name: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
              required
            />

            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
              required
            />

            <input
              type="date"
              value={formData.date_received}
              onChange={(e) =>
                setFormData({ ...formData, date_received: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
              required
            />

            <select
              value={formData.payment_mode}
              onChange={(e) =>
                setFormData({ ...formData, payment_mode: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
            >
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>Cheque</option>
            </select>

            <textarea
              placeholder="Notes (optional)"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
            ></textarea>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-5 py-2 text-white rounded-lg shadow-md transition-all duration-150 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {activeTab === "expense" ? "Add Expense" : "Add Income"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
