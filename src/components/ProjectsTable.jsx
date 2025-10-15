import { Eye, Pencil } from "lucide-react";
import React from "react"; // Removed useState and useEffect

// Accept projects as a prop from the parent component
export default function ProjectsTable({ projects }) { 
  
  // No need for internal useEffect to fetch data

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Ongoing":
        return "bg-gray-100 text-gray-700";
      case "Planned":
        return "bg-gray-100 text-gray-700";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className="p-4 md:p-6">
     
      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Project Name</th>
              <th className="px-4 py-3 text-left font-medium">Client</th>
              <th className="px-4 py-3 text-left font-medium">Start Date</th>
              <th className="px-4 py-3 text-left font-medium">End Date</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Budget</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr
                key={p.project_id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
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
                  ${parseFloat(p.budget).toLocaleString()}
                </td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <Eye size={16} className="cursor-pointer" />
                  <Pencil size={16} className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && (
            <div className="p-4 text-center text-gray-500">No projects found. Add a new one!</div>
        )}
      </div>

       <div className="md:hidden space-y-4">
        {projects.map((p) => (
          <div
            key={p.project_id}
            className="bg-white shadow-sm rounded-xl p-4 space-y-3 border"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">{p.projectname}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                  p.status
                )}`}
              >
                {p.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">{p.clientname}</p>
            <div className="text-sm text-gray-700">
              <p>
                <span className="font-medium">Start:</span> {formatDate(p.startdate)}
              </p>
              <p>
                <span className="font-medium">End:</span> {formatDate(p.enddate)}
              </p>
            </div>
            <p className="text-green-700 font-semibold text-sm">
              Budget: ${parseFloat(p.budget).toLocaleString()}
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Eye size={16} className="cursor-pointer" />
              <Pencil size={16} className="cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
}