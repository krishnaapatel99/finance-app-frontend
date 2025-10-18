import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

export default function AddIncomeModal({ onClose, onIncomeAdded, projects }) {
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
      await axios.post(`${API}/api/finance/add`, formData);
      onIncomeAdded();
      onClose();
    } catch (err) {
      console.error("Error adding income:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Income</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="project_id"
            value={formData.project_id}
            onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
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
            className="w-full border rounded-lg px-3 py-2"
            value={formData.client_name}
            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Amount"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />

          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.date_received}
            onChange={(e) => setFormData({ ...formData, date_received: e.target.value })}
            required
          />

          <select
            value={formData.payment_mode}
            onChange={(e) => setFormData({ ...formData, payment_mode: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>Bank Transfer</option>
            <option>Cash</option>
            <option>Cheque</option>
          </select>

          <textarea
            placeholder="Notes (optional)"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          ></textarea>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
