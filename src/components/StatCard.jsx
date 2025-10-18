import React, { useState, useEffect } from "react";
import axios from "axios";
const API = import.meta.env.VITE_BACKEND_URL;
// Helper to format currency
const formatCurrency = (amount) => {
    // COALESCE returns a string from the DB, so we parse it first.
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(parseFloat(amount));
};

const StatCard = ({ title, value, change, up }) => {
    // 1. New state to hold financial data
    const [financeSummary, setFinanceSummary] = useState({
        total_income: 0,
        total_expense: 0,
        net_profit: 0
    });

    // 2. Fetch data on component mount
    useEffect(() => {
        const fetchFinanceSummary = async () => {
            try {
                // Endpoint defined in server.js and dashboardRoute.js
                const response = await axios.get(`${API}/api/dashboard`);
                setFinanceSummary(response.data);
            } catch (error) {
                console.error("Error fetching finance summary:", error);
                // Keep the default 0s on error
            }
        };
        fetchFinanceSummary();
    }, []);

    // We'll calculate the Net Profit percentage change for a cleaner display
    const netProfitChange = financeSummary.total_income > 0 
        ? ((financeSummary.net_profit / financeSummary.total_income) * 100).toFixed(1)
        : 0;


    return (
        <div className="flex flex-col">
            <div className="
                bg-white/80 backdrop-blur-md border border-gray-100 
                shadow-sm hover:shadow-md transition-all duration-200
                rounded-2xl p-4 mb-2 text-center hover:-translate-y-1
            ">
                <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
                {/* Use fetched data */}
                <h3 className="text-2xl font-semibold text-slate-800">
                    {formatCurrency(financeSummary.total_income)}
                </h3>
                <p className="text-sm font-medium text-green-500">
                    {/* Placeholder for real change calculation */}
                    +1.5%
                </p>
            </div>
            <div className="flex justify-between gap-4 mb-4">
                <div className="
                    bg-white/80 backdrop-blur-md border border-gray-100 
                    shadow-sm hover:shadow-md transition-all duration-200
                    rounded-2xl p-4 text-center hover:-translate-y-1 w-[50%]
                ">
                    <p className="text-gray-500 text-sm mb-1">Total Expenses</p>
                    {/* Use fetched data */}
                    <h3 className="text-2xl font-semibold text-slate-800">
                        {formatCurrency(financeSummary.total_expense)}
                    </h3>
                    <p className="text-sm font-medium text-red-500">
                        -3.2%
                    </p>
                </div>
                <div className="
                    bg-white/80 backdrop-blur-md border border-gray-100 
                    shadow-sm hover:shadow-md transition-all duration-200
                    rounded-2xl p-4 text-center hover:-translate-y-1 w-[50%]
                ">
                    <p className="text-gray-500 text-sm mb-1">Net Profit</p>
                    {/* Use fetched data */}
                    <h3 className="text-2xl font-semibold text-slate-800">
                        {formatCurrency(financeSummary.net_profit)}
                    </h3>
                    <p className={`text-sm font-medium ${netProfitChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {netProfitChange}% margin
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatCard;