import { NavLink, Outlet } from "react-router-dom";
import React, { useState } from "react";

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="d-flex">
            <div className={`sidebar bg-light p-3 ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="d-flex justify-content-between h-14 align-items-center">
                    <span className="flex">
                        <button className="btn-icon" onClick={toggleSidebar}>
                            <i className={`bi ${sidebarOpen ? 'bi-list' : 'bi-x'}`}></i>
                        </button>
                    </span>
                    <span className="flex">
                        <NavLink to="/chat" className="btn-icon">
                            <i className="bi bi-chat-dots"></i>
                        </NavLink>
                    </span>
                </div>

            </div>
            <div className="content flex-grow-1 p-3">
                <Outlet />
            </div>
        </div>
    );
}
