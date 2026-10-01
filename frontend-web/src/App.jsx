import { Routes, Route } from "react-router-dom";

import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import ProtectedRoute from "./route/ProtectedRoute";
import OnboardNamePage from "./onboard/NamePage";
import OnboardWelcomePage from "./onboard/WelcomePage";
import OnboardingRoute from "./route/OnboardingRoute";
import HouseholdPage from "./onboard/HouseholdPage";
import MembersPage from "./onboard/MembersPage";
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
import { Dashboard, DashboardHome } from "./dashboard";
import DashboardMealPlan from "./dashboard/meal-plan/DashboardMealPlan";
>>>>>>> Stashed changes
=======
import { Dashboard, DashboardHome } from "./dashboard";
>>>>>>> dashboard

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<OnboardingRoute />}>
                <Route path="/onboard/welcome" element={<OnboardWelcomePage />} />
                <Route path="/onboard/name" element={<OnboardNamePage />} />
                <Route path="/onboard/household" element={<HouseholdPage />} />
                <Route path="/onboard/household/members" element={<MembersPage />} />
            </Route>

          <Route element={<ProtectedRoute />}>
<<<<<<< HEAD
<<<<<<< Updated upstream
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<h1>Dashboard</h1>}/>
=======
=======
>>>>>>> dashboard
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="household" element={<h1>Household</h1>} />
                    <Route path="recipes" element={<h1>Recipes</h1>} />
<<<<<<< HEAD
                    <Route path="meal-plan" element={<DashboardMealPlan />} />
                    <Route path="shopping" element={<h1>Shopping List</h1>} />
                    <Route path="settings" element={<h1>Settings</h1>} />
                </Route>
>>>>>>> Stashed changes
=======
                    <Route path="meal-plan" element={<h1>Meal Plan</h1>} />
                    <Route path="shopping" element={<h1>Shopping List</h1>} />
                    <Route path="settings" element={<h1>Settings</h1>} />
                </Route>
>>>>>>> dashboard
          </Route>
        </Routes>
    );
}

export default App;
