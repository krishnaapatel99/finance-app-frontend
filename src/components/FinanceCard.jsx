import React from "react";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount || 0));

export default function FinanceCard({ summary }) {
  const { totalBudget, totalExpense, remainingBalance } = summary || {};
  const balancePercent =
    totalBudget > 0 ? ((remainingBalance / totalBudget) * 100).toFixed(1) : 0;

  return (
    <div className="flex flex-col">
      <div
        className="bg-white/80 backdrop-blur-md border border-gray-100 
            shadow-sm hover:shadow-md transition-all duration-200
            rounded-2xl p-4 mb-2 text-center hover:-translate-y-1"
      >
        <p className="text-gray-500 text-sm mb-1">Total Income</p>
        <h3 className="text-2xl font-semibold text-slate-800">
          {formatCurrency(totalBudget)}
        </h3>
        <p className="text-sm font-medium text-green-500">+1.5%</p>
      </div>

      <div className="flex justify-between gap-4 mb-4">
        <div
          className="bg-white/80 backdrop-blur-md border border-gray-100 
              shadow-sm hover:shadow-md transition-all duration-200
              rounded-2xl p-4 text-center hover:-translate-y-1 w-[50%]"
        >
          <p className="text-gray-500 text-sm mb-1">Total Expenses</p>
          <h3 className="text-2xl font-semibold text-slate-800">
            {formatCurrency(totalExpense)}
          </h3>
          <p className="text-sm font-medium text-red-500">-3.2%</p>
        </div>

        <div
          className="bg-white/80 backdrop-blur-md border border-gray-100 
              shadow-sm hover:shadow-md transition-all duration-200
              rounded-2xl p-4 text-center hover:-translate-y-1 w-[50%]"
        >
          <p className="text-gray-500 text-sm mb-1">Rem. Balance</p>
          <h3 className="text-2xl font-semibold text-slate-800">
            {formatCurrency(remainingBalance)}
          </h3>
          <p
            className={`text-sm font-medium ${
              balancePercent >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {balancePercent}% saved
          </p>
        </div>
      </div>
    </div>
  );
}
