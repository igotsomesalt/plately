import { Bell, ChevronDown } from "lucide-react";
import "./Dashboard.css"

export default function TopBar() {
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
                        B
                    </span>

                    <span className="top-bar-username">
                        Burke
                    </span>

                    <ChevronDown size={16} />
                </button>
            </div>
        </header>
    );
}