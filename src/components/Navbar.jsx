import React from 'react';
import { Menu, User } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
    return (
        <nav className="
            sticky top-0 w-full 
            bg-white/90 backdrop-blur-md 
            border-b border-gray-200 
            py-3 px-4 md:px-6
            flex items-center justify-between
            shadow-sm
            z-30
        ">
            <div className="flex items-center gap-4">
                {/* Menu Button - Visible on mobile/small screens only */}
                <button 
                    onClick={toggleSidebar}
                    className="  p-2 rounded-lg md:hidden  duration-200 text-black"
                >
                    <Menu size={20} />
                </button>
                
                {/* Company Logo/Title (Shown on desktop) */}
                
                {/* App Title (Shown on mobile when sidebar is closed) */}
               
            </div>
            <p className=" text-2xl font-extrabold text-black  ">
                    CBW 
                </p>

            {/* Profile Button */}
            <div className="flex items-center gap-4 ">
                <button className="
                    text-white  p-2 
                    rounded-full 
                    bg-black 
                    shadow-md  focus:outline-none focus:ring-4 focus:ring-indigo-300
                ">
                    <User size={20} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
