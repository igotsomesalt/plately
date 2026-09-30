import { Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../auth/AuthContext"; 
import "./Dashboard.css"

export default function TopBar() {

    const { user } = useAuth();

    return (
        <header className="top-bar">
            <div className="top-bar-brand">
                Plately
            </div>

            <div className="top-bar-actions">
                <button
                    type="button"
                    className="top-bar-icon"
                    aria-label="Notifications"
                >
                    <Bell size={20} strokeWidth={2} />
                </button>

                <button
                    type="button"
                    className="top-bar-user"
                >
                    <span className="top-bar-avatar">
                        {user.name.charAt(0)}
                    </span>

                    <span className="top-bar-username">
                        {user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}
                    </span>

                    <ChevronDown size={16} />
                </button>
            </div>
        </header>
    );
}