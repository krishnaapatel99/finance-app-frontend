import React from "react";
import { X, LayoutDashboard, DollarSign, FolderKanban, FileText, ChartColumn } from "lucide-react";
import { Link } from 'react-router-dom';


// Helper component for cleaner menu item rendering (kept local to Sidebar)
const SidebarButton = ({ icon: Icon, text, fromColor, toColor }) => (
    <button className={`
        relative group 
        bg-gradient-to-r from-${fromColor} to-${toColor} 
        hover:from-${fromColor.replace('-600', '-700').replace('-500', '-600')} hover:to-${toColor.replace('-600', '-700').replace('-500', '-600')}
        text-white font-medium 
        px-4 py-3 rounded-xl flex items-center gap-3 
        justify-start
        shadow-md hover:shadow-xl transition-all duration-200 w-full
    `}>
        <Icon size={20} />
        <span className="text-sm">{text}</span>
    </button>
);

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <>
            {/* Mobile Overlay for closing sidebar on tap outside */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar Container - Uses translate-x for mobile slide-in, sticky for desktop */}
            <div
                className={`
                    fixed top-0 bottom-0 left-0 w-64
                    bg-gradient-to-b from-slate-900 to-slate-800
                    border-r border-slate-700
                    flex flex-col
                    py-6
                    shadow-2xl md:shadow-none
                    z-50
                    transform transition-transform duration-300
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:sticky md:top-0 md:h-screen
                `}
            >
                <div className="flex justify-between items-center px-4 mb-8">
                  
                    <button 
                        onClick={toggleSidebar}
                        className="text-white hover:text-red-400 p-1 md:hidden transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col gap-3 w-full px-3">
                   <Link  to="/"> <SidebarButton icon={LayoutDashboard} text="Dashboard" fromColor="blue-600" toColor="indigo-600" /></Link>
                    <SidebarButton icon={DollarSign} text="Finance" fromColor="emerald-600" toColor="teal-600" />
                   <Link to="/project"> <SidebarButton icon={FolderKanban} text="Projects" fromColor="blue-500" toColor="sky-600" /></Link>
                    <SidebarButton icon={FileText} text="Reports" fromColor="orange-500" toColor="yellow-600" />
                    <Link to="/document"> <SidebarButton icon={FolderKanban} text="Documents" fromColor="blue-500" toColor="sky-600" /></Link>
                    
                </div>
            </div>
        </>
    );
};

export default Sidebar;
