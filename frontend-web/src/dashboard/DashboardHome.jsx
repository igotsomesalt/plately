import { CalendarDays, ShoppingCart, Users, Plus } from "lucide-react";
import { Card } from "../components/card";
import { useAuth } from "../auth/AuthContext";

export default function DashboardHome() {
    const { user } = useAuth();

    return (
        <div className="container-fluid">

            {/* Greeting */}
            <div className="mb-4">
                <h1 className="h3 mb-1">Good afternoon, {
                    user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()
                }!</h1>
                <p className="text-muted mb-0">
                    Here's what's happening with your household.
                </p>
            </div>

            {/* Top row */}
            <div className="row g-4 mb-4">

                {/* Meal Plan */}
                <div className="col-12 col-xl-8">
                    <Card className="h-100">
                        <div className="card-body p-4">

                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div>
                                    <h2 className="h5 mb-1">This Week</h2>
                                    <p className="text-muted small mb-0">
                                        Your upcoming meals
                                    </p>
                                </div>

                                <CalendarDays size={22} />
                            </div>

                            <div className="row g-3">

                                <div className="col">
                                    <div className="text-center">
                                        <div className="small text-muted mb-2">
                                            Mon
                                        </div>
                                        <div className="fs-4 mb-2">🍝</div>
                                        <div className="small">
                                            Pasta
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="text-center">
                                        <div className="small text-muted mb-2">
                                            Tue
                                        </div>
                                        <div className="fs-4 mb-2">🥗</div>
                                        <div className="small">
                                            Salad
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="text-center">
                                        <div className="small text-muted mb-2">
                                            Wed
                                        </div>
                                        <div className="fs-4 mb-2">🍗</div>
                                        <div className="small">
                                            Chicken
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="text-center">
                                        <div className="small text-muted mb-2">
                                            Thu
                                        </div>
                                        <div className="fs-4 mb-2">🌮</div>
                                        <div className="small">
                                            Tacos
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="text-center">
                                        <div className="small text-muted mb-2">
                                            Fri
                                        </div>
                                        <div className="fs-4 mb-2">🍕</div>
                                        <div className="small">
                                            Pizza
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-4 pt-3 border-top">
                                <a
                                    href="/dashboard/meal-plan"
                                    className="text-decoration-none"
                                >
                                    View meal plan →
                                </a>
                            </div>

                        </div>
                    </Card>
                </div>

                {/* Shopping List */}
                <div className="col-12 col-xl-4">
                    <Card className="h-100">
                        <div className="card-body p-4">

                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div>
                                    <h2 className="h5 mb-1">Shopping List</h2>
                                    <p className="text-muted small mb-0">
                                        This week's groceries
                                    </p>
                                </div>

                                <ShoppingCart size={22} />
                            </div>

                            <div className="mb-3">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="small">
                                        12 purchased
                                    </span>
                                    <span className="small text-muted">
                                        8 remaining
                                    </span>
                                </div>

                                <div
                                    className="progress"
                                    role="progressbar"
                                    aria-label="Shopping list progress"
                                    aria-valuenow="60"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <div
                                        className="progress-bar bg-success"
                                        style={{ width: "60%" }}
                                    />
                                </div>
                            </div>

                            <h3 className="h4 mb-0">20 items</h3>

                            <div className="mt-4 pt-3 border-top">
                                <a
                                    href="/dashboard/shopping"
                                    className="text-decoration-none"
                                >
                                    View shopping list →
                                </a>
                            </div>

                        </div>
                    </Card>
                </div>

            </div>

            {/* Tonight */}
            <Card className="mb-4">
                <div className="card-body p-4">

                    <div className="row align-items-center">

                        <div className="col-12 col-md">
                            <p className="small text-muted text-uppercase fw-semibold mb-2">
                                Tonight
                            </p>

                            <h2 className="h4 mb-2">
                                Chicken Teriyaki
                            </h2>

                            <p className="text-muted mb-0">
                                35 min · 620 cal/person · Serves 4
                            </p>
                        </div>

                        <div className="col-12 col-md-auto mt-3 mt-md-0">
                            <a
                                href="/dashboard/recipes"
                                className="btn btn-outline-success"
                            >
                                View Recipe
                            </a>
                        </div>

                    </div>

                </div>
            </Card>

            {/* Bottom row */}
            <div className="row g-4">

                {/* Household */}
                <div className="col-12 col-md-6">
                    <Card className="h-100">
                        <div className="card-body p-4">

                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div>
                                    <h2 className="h5 mb-1">Household</h2>
                                    <p className="text-muted small mb-0">
                                        Your household members
                                    </p>
                                </div>

                                <Users size={22} />
                            </div>

                            <div className="d-flex flex-column gap-3">

                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        👤
                                    </div>
                                    <span>Burke</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        👤
                                    </div>
                                    <span>Member</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        👤
                                    </div>
                                    <span>Member</span>
                                </div>

                            </div>

                            <div className="mt-4 pt-3 border-top">
                                <a
                                    href="/dashboard/household"
                                    className="text-decoration-none"
                                >
                                    Manage household →
                                </a>
                            </div>

                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="col-12 col-md-6">
                    <Card className="h-100">
                        <div className="card-body p-4">

                            <div className="mb-4">
                                <h2 className="h5 mb-1">Quick Actions</h2>
                                <p className="text-muted small mb-0">
                                    Common tasks
                                </p>
                            </div>

                            <div className="d-flex flex-column gap-2">

                                <a
                                    href="/dashboard/recipes"
                                    className="btn btn-outline-secondary text-start"
                                >
                                    <Plus size={18} className="me-2" />
                                    Add Recipe
                                </a>

                                <a
                                    href="/dashboard/meal-plan"
                                    className="btn btn-outline-secondary text-start"
                                >
                                    <Plus size={18} className="me-2" />
                                    Plan Meals
                                </a>

                                <a
                                    href="/dashboard/shopping"
                                    className="btn btn-outline-secondary text-start"
                                >
                                    <Plus size={18} className="me-2" />
                                    Add Shopping Item
                                </a>

                            </div>

                        </div>
                    </Card>
                </div>

            </div>

        </div>
    );
}