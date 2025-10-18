import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Stamp } from "lucide-react";
import FinanceTable from "../components/FinanceTable";
import AddIncomeModal from "../components/AddIncomeModal";
import StatCard from "../src/components/StatCard";

const API = import.meta.env.VITE_BACKEND_URL;

export default function Finance() {
  const [incomes, setIncomes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [activeTab, setActiveTab] = useState("income");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFinanceData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API}/api/finance`);
      setIncomes(res.data.income || []);
    } catch (err) {
      console.error("Error fetching finance data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/api/project`);
      setProjects(res.data);
    } catch (err) {
      console.error("Error loading projects:", err);
    }
  };

  useEffect(() => {
    fetchFinanceData();
    fetchProjects();
  }, []);

  const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const totalExpenses = 38000; // placeholder
  const netProfit = totalIncome - totalExpenses;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          Finance
        </h1>
        <p className="text-gray-500 mt-1">
          Track income and expenses across all projects
        </p>
      </header>

      {/* Summary Cards */}
      <StatCard/>

      {/* Filter and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Filter by Project:</span>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option>All Projects</option>
            {projects.map((p) => (
              <option key={p.project_id}>{p.projectname}</option>
            ))}
          </select>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => setActiveTab("income")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "income"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-600"
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setActiveTab("expenses")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "expenses"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-600"
            }`}
          >
            Expenses
          </button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center p-8 text-gray-500">Loading records...</div>
      ) : (
        <FinanceTable
          data={incomes}
          activeTab={activeTab}
          selectedProject={selectedProject}
        />
      )}

      {/* Add Income */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
        >
          <Plus size={18} /> Add Income
        </button>
      </div>

      {isModalOpen && (
        <AddIncomeModal
          onClose={() => setIsModalOpen(false)}
          onIncomeAdded={fetchFinanceData}
          projects={projects}
        />
      )}
    </div>
  );
}
