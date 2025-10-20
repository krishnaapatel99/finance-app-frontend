import React from "react";
import { Eye, Pencil } from "lucide-react";

export default function ProjectsTable({ projects, onEditProject }) {
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div className="p-4 md:p-6">
      {/* 🖥️ Desktop Table */}
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
                  <Eye
                    size={16}
                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                  />
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

        {projects.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No projects found. Add a new one!
          </div>
        )}
      </div>

      {/* 📱 Mobile Card View */}
      <div className="md:hidden space-y-4">
        {projects.map((p) => (
          <div
            key={p.project_id}
            className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-gray-800">
                {p.projectname}
              </h3>
              <div className="flex gap-2">
                <Eye
                  size={18}
                  className="cursor-pointer text-gray-600 hover:text-gray-800"
                />
                <Pencil
                  size={18}
                  className="cursor-pointer text-gray-600 hover:text-blue-600"
                  onClick={() => onEditProject(p)}
                />
              </div>
            </div>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Client:</span> {p.clientname}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Start:</span> {formatDate(p.startdate)}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-medium">End:</span> {formatDate(p.enddate)}
            </p>

            <p className="text-sm">
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  p.status
                )}`}
              >
                {p.status}
              </span>
            </p>

            <p className="text-sm text-green-600 font-semibold">
              Budget: ₹{parseFloat(p.budget).toLocaleString("en-IN")}
            </p>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="p-4 text-center text-gray-500 bg-white rounded-xl shadow-sm">
            No projects found. Add a new one!
          </div>
        )}
      </div>
    </div>
  );
}
