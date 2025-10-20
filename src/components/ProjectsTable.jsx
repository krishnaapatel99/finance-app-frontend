import React from "react";
import { Eye, Pencil } from "lucide-react";

export default function ProjectsTable({ projects, onEditProject }) {
  // Helper function for status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Ongoing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Helper function for date formatting
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    // Formats to DD/MM/YYYY
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  // ----------------------------------------------------
  // Handle empty projects list for both desktop and mobile
  // ----------------------------------------------------
  if (!projects || projects.length === 0) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-sm p-4 text-center text-gray-500">
          No projects found. Add a new one!
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* ----------------------------------
        1. Desktop Table View (Hidden on mobile, shown on md screens and up)
        ----------------------------------
      */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Project</th>
              <th className="px-4 py-3 text-left font-medium">Client</th>
              <th className="px-4 py-3 text-left font-medium">Start</th>
              <th className="px-4 py-3 text-left font-medium">End</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Budget</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.project_id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold">{p.projectname}</td>
                <td className="px-4 py-3">{p.clientname}</td>
                <td className="px-4 py-3">{formatDate(p.startdate)}</td>
                <td className="px-4 py-3">{formatDate(p.enddate)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      p.status
                    )}`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-green-600 font-semibold">
                  ₹{parseFloat(p.budget).toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <Eye size={16} className="cursor-pointer text-gray-600 hover:text-gray-800" />
                  <Pencil
                    size={16}
                    className="cursor-pointer text-gray-600 hover:text-blue-600"
                    onClick={() => onEditProject(p)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ----------------------------------
        2. Mobile Card View (Shown on mobile, hidden on md screens and up)
        ----------------------------------
      */}
      <div className="md:hidden space-y-4">
        {projects.map((p) => (
          <div 
            key={p.project_id} 
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
          >
            {/* Header: Project Name and Status Badge */}
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-gray-900">{p.projectname}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  p.status
                )}`}
              >
                {p.status}
              </span>
            </div>
            
            {/* Details */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong className="text-gray-700">Client:</strong> {p.clientname}
              </p>
              <p>
                <strong className="text-gray-700">Budget:</strong> 
                <span className="text-green-600 font-semibold ml-1">
                  ₹{parseFloat(p.budget).toLocaleString("en-IN")}
                </span>
              </p>
              <p>
                <strong className="text-gray-700">Period:</strong> {formatDate(p.startdate)} - {formatDate(p.enddate)}
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex justify-end items-center gap-4 mt-4 pt-3 border-t border-gray-100">
              <Eye size={18} className="cursor-pointer text-gray-600 hover:text-gray-800" />
              <Pencil
                size={18}
                className="cursor-pointer text-gray-600 hover:text-blue-600"
                onClick={() => onEditProject(p)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}