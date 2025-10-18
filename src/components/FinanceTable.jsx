import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function FinanceTable({ data, activeTab, selectedProject, onEdit, onDelete }) {
  const filteredData = selectedProject === "All Projects" ? data : data.filter(d => d.project_name === selectedProject);
  const formatDate = date => new Date(date).toLocaleDateString("en-GB");

  if (!filteredData.length) return <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500 border">No {activeTab} records found.</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto border">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Project</th>
            <th className="px-4 py-3 text-left font-medium">Client</th>
            <th className="px-4 py-3 text-left font-medium">Amount</th>
            <th className="px-4 py-3 text-left font-medium">Date</th>
            <th className="px-4 py-3 text-left font-medium">Mode</th>
            <th className="px-4 py-3 text-left font-medium">Notes</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.finance_id} className="border-t hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">{item.project_name}</td>
              <td className="px-4 py-3">{item.client_name}</td>
              <td className={`px-4 py-3 font-medium ${activeTab === "income" ? "text-green-600" : "text-red-500"}`}>₹{Number(item.amount).toLocaleString()}</td>
              <td className="px-4 py-3">{formatDate(item.date_received)}</td>
              <td className="px-4 py-3">{item.payment_mode}</td>
              <td className="px-4 py-3">{item.notes || "-"}</td>
              <td className="px-4 py-3 flex gap-2">
                <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800"><Pencil size={16} /></button>
                <button onClick={() => onDelete(item.finance_id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
