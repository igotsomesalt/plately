import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function OnboardingRoute() {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const steps = [
        {
            step: "WELCOME",
            path: "/onboard/welcome",
        },
        {
            step: "NAME",
            path: "/onboard/name",
        },
        {
            step: "HOUSEHOLD",
            path: "/onboard/household",
        },
        {
            step: "MEMBERS",
            path: "/onboard/household/members",
        },
    ];

    if (user.onboardStep === "COMPLETED") {
        return <Navigate to="/dashboard" replace />;
    }

    const currentStepIndex = steps.findIndex(
        (step) => step.step === user.onboardStep
    );

    const currentPathIndex = steps.findIndex(
        (step) => step.path === location.pathname
    );

    if (currentStepIndex === -1) {
        return <Navigate to="/onboard/welcome" replace />;
    }

    if (currentPathIndex === -1) {
        return (
            <Navigate
                to={steps[currentStepIndex].path}
                replace
            />
        );
    }

    if (currentPathIndex > currentStepIndex) {
        return (
            <Navigate
                to={steps[currentStepIndex].path}
                replace
            />
        );
    }

    return <Outlet />;
}