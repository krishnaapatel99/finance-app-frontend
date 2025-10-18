import { Eye, Trash2, FileText } from "lucide-react";
import React from "react";

export default function DocumentsTable({ documents, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const handleView = (url) => {
    if (!url) return alert("❌ No file link found for this document");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="p-4 md:p-6">
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">File Name</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Project</th>
              <th className="px-4 py-3 text-left font-medium">Upload Date</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" /> {d.name}
                </td>
                <td className="px-4 py-3">{d.type}</td>
                <td className="px-4 py-3">{d.project}</td>
                <td className="px-4 py-3">{formatDate(d.upload_date)}</td>
                <td className="px-4 py-3 flex gap-3">
                  <Eye className="cursor-pointer text-gray-600 hover:text-blue-600" 
                   onClick={() => handleView(d.file_url)}/>
                  <Trash2
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => onDelete(d.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {documents.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No documents found. Upload one!
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {documents.map((d) => (
          <div key={d.id} className="bg-white shadow-sm rounded-xl p-4 space-y-3 border">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">{d.name}</h3>
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {d.type}
              </span>
            </div>
            <p className="text-sm text-gray-500">Project: {d.project}</p>
            <p className="text-sm text-gray-600">
              Uploaded: {formatDate(d.upload_date)}
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Eye size={16} 
              className="cursor-pointer text-gray-600"
               onClick={() => handleView(d.file_url)} />
              <Trash2
                size={16}
                className="cursor-pointer text-red-500"
                onClick={() => onDelete(d.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
