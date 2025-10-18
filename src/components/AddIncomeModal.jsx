import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

export default function AddIncomeModal({ onClose, onAdded, projects, activeTab }) {
  const [formData, setFormData] = useState({
    project_id: "",
    client_name: "",
    amount: "",
    date_received: "",
    payment_mode: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        activeTab === "income"
          ? `${API}/api/finance/income/add`
          : `${API}/api/finance/expense/add`;

      await axios.post(endpoint, formData);
      onAdded();
      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      alert(`Failed to add ${activeTab}.`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Add {activeTab === "income" ? "Income" : "Expense"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p.project_id} value={p.project_id}>
                {p.projectName}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="client_name"
            placeholder="Client Name"
            value={formData.client_name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          <input
            type="date"
            name="date_received"
            value={formData.date_received}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            name="payment_mode"
            placeholder="Payment Mode (e.g. Cash, Bank)"
            value={formData.payment_mode}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Add {activeTab === "income" ? "Income" : "Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
