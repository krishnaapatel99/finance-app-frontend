import React, { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

// Helper to format currency in Indian style (₹)
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(parseFloat(amount || 0));
};

export default function FinanceCard({ projectId }) {
    const [financeData, setFinanceData] = useState({
        totalIncome: 0,
        totalExpense: 0,
        remainingBalance: 0,
    });

    useEffect(() => {
        const fetchFinanceData = async () => {
            try {
                const endpoint = projectId
                    ? `${API}/api/finance/summary?project_id=${projectId}`
                    : `${API}/api/finance/summary`;
                const response = await axios.get(endpoint);

                if (response.data.success) {
                    setFinanceData(response.data.data);
                } else {
                    console.error("Error in API response:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching finance data:", error);
            }
        };

        fetchFinanceData();
    }, [projectId]);

    // Optional: percentage of remaining balance over income
    const balancePercent =
        financeData.totalIncome > 0
            ? ((financeData.remainingBalance / financeData.totalIncome) * 100).toFixed(1)
            : 0;

    return (
        <div className="flex flex-col">
            {/* Total Income Card */}
            <div className="
                bg-white/80 backdrop-blur-md border border-gray-100 
                shadow-sm hover:shadow-md transition-all duration-200
                rounded-2xl p-4 mb-2 text-center hover:-translate-y-1
            ">
                <p className="text-gray-500 text-sm mb-1">Total Income</p>
                <h3 className="text-2xl font-semibold text-slate-800">
                    {formatCurrency(financeData.totalIncome)}
                </h3>
                <p className="text-sm font-medium text-green-500">+1.5%</p>
            </div>

            {/* Expense & Remaining Balance Row */}
            <div className="flex justify-between gap-4 mb-4">
                {/* Total Expense */}
                <div className="
                    bg-white/80 backdrop-blur-md border border-gray-100 
                    shadow-sm hover:shadow-md transition-all duration-200
                    rounded-2xl p-4 text-center hover:-translate-y-1 w-[50%]
                ">
                    <p className="text-gray-500 text-sm mb-1">Total Expenses</p>
                    <h3 className="text-2xl font-semibold text-slate-800">
                        {formatCurrency(financeData.totalExpense)}
                    </h3>
                    <p className="text-sm font-medium text-red-500">-3.2%</p>
                </div>

                {/* Remaining Balance */}
                <div className="
                    bg-white/80 backdrop-blur-md border border-gray-100 
                    shadow-sm hover:shadow-md transition-all duration-200
                    rounded-2xl p-4 text-center hover:-translate-y-1 w-[50%]
                ">
                    <p className="text-gray-500 text-sm mb-1">Rem. Balance</p>
                    <h3 className="text-2xl font-semibold text-slate-800">
                        {formatCurrency(financeData.remainingBalance)}
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
