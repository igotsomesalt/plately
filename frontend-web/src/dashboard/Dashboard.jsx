import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import "./Dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard">
            <TopBar />

            <div className="dashboard-body">
                <SideBar />

                <main className="dashboard-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}