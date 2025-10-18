import React from "react";

export default function FinanceTable({ data, activeTab, selectedProject }) {
  const filtered =
    selectedProject === "All Projects"
      ? data
      : data.filter((i) => i.project_name === selectedProject);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB");

  if (activeTab === "expenses") {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-gray-500 text-center border">
        Expense data will be displayed here.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto border">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Project Name</th>
            <th className="px-4 py-3 text-left font-medium">Client Name</th>
            <th className="px-4 py-3 text-left font-medium">Amount</th>
            <th className="px-4 py-3 text-left font-medium">Date Received</th>
            <th className="px-4 py-3 text-left font-medium">Payment Mode</th>
            <th className="px-4 py-3 text-left font-medium">Notes</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((i) => (
              <tr
                key={i.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{i.project_name}</td>
                <td className="px-4 py-3">{i.client_name}</td>
                <td className="px-4 py-3 text-green-600 font-medium">
                  ${Number(i.amount).toLocaleString()}
                </td>
                <td className="px-4 py-3">{formatDate(i.date_received)}</td>
                <td className="px-4 py-3">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                    {i.payment_mode}
                  </span>
                </td>
                <td className="px-4 py-3">{i.notes || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-6 text-center text-gray-500">
                No income records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
