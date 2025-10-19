import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import axios from "axios";
import Sidebar from "../src/components/Sidebar";
import Navbar from "../src/components/Navbar";
import StatCard from "../src/components/StatCard";
import FinanceTable from "../src/components/FinanceTable";
import AddIncomeModal from "../src/components/AddIncomeModal";

const API = import.meta.env.VITE_BACKEND_URL;

export default function Finance() {
  const [isSidebarOpen, setIsSidbarOpen] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [activeTab, setActiveTab] = useState("income"); // "income" or "expense"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => setIsSidbarOpen(!isSidebarOpen);

  useEffect(() => {
    fetchProjects();
    fetchFinanceData("income");
    fetchFinanceData("expense");
  }, []);

  const fetchFinanceData = async (tab) => {
    try {
      if (tab === "income" || tab === "expense") setIsLoading(true);
      const res = await axios.get(`${API}/api/finance`);
      if (tab === "income") setIncomes(res.data.income || []);
      if (tab === "expense") setExpenses(res.data.expense || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/api/project`);
      setProjects(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const totalIncome = incomes.reduce((acc, i) => acc + Number(i.amount), 0);
  const totalExpenses = expenses.reduce((acc, i) => acc + Number(i.amount), 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={setIsSidbarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Header */}
          <header className="flex sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Finance Overview</h1>
              <p className="text-gray-500 mt-1">Track income and expenses across all projects</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center h-14 gap-2 mt-4 sm:mt-0 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition"
            >
              <Plus size={18} /> Add {activeTab === "income" ? "Income" : "Expense"}
            </button>
          </header>

          <StatCard totalIncome={totalIncome} totalExpenses={totalExpenses} netProfit={netProfit} />

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Filter by Project:</span>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option>All Projects</option>
                {projects.map((p) => (
                  <option key={p.project_id}>{p.projectName}</option>
                ))}
              </select>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
              <button
                onClick={() => setActiveTab("income")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "income" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-blue-500"
                }`}
              >
                Income
              </button>
              <button
                onClick={() => setActiveTab("expense")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "expense" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-blue-500"
                }`}
              >
                Expense
              </button>
            </div>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="text-center p-8 text-gray-500">Loading records...</div>
          ) : (
            <FinanceTable
              data={activeTab === "income" ? incomes : expenses}
              activeTab={activeTab}
              selectedProject={selectedProject}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          )}

          {/* Modal */}
          {isModalOpen && (
            <AddIncomeModal
              onClose={() => setIsModalOpen(false)}
              onIncomeAdded={(tab) => fetchFinanceData(tab)}
              projects={projects}
              activeTab={activeTab}
            />
          )}
        </main>
      </div>
    </div>
  );
}
