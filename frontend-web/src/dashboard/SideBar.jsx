import {
    House,
    Users,
    Utensils,
    CalendarDays,
    ShoppingCart,
    Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import "./Dashboard.css"

const navigation = [
    {
        label: "Dashboard",
        icon: House,
        path: "/dashboard",
    },
    {
        label: "Household",
        icon: Users,
        path: "/dashboard/household",
    },
    {
        label: "Recipes",
        icon: Utensils,
        path: "/dashboard/recipes",
    },
    {
        label: "Meal Plan",
        icon: CalendarDays,
        path: "/dashboard/meal-plan",
    },
    {
        label: "Shopping List",
        icon: ShoppingCart,
        path: "/dashboard/shopping",
    },
];

export default function SideBar() {
    return (
        <aside className="side-bar">
            <nav className="side-bar-nav">
                <div className="side-bar-section-label">
                    MENU
                </div>

                {navigation.map(({ label, icon: Icon, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `side-bar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <Icon size={19} strokeWidth={2} />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="side-bar-bottom">
                <NavLink
                    to="/dashboard/settings"
                    className={({ isActive }) =>
                        `side-bar-link ${isActive ? "active" : ""}`
                    }
                >
                    <Settings size={19} strokeWidth={2} />
                    <span>Settings</span>
                </NavLink>
            </div>
        </aside>
    );
}