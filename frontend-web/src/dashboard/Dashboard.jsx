import { Outlet } from "react-router-dom";

import TopBar from "./TopBar";
import SideBar from "./SideBar";
import "./Dashboard.css"

export default function Dashboard() {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <TopBar />

            <div className="d-flex flex-grow-1">
                <SideBar />

                <main className="flex-grow-1 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}