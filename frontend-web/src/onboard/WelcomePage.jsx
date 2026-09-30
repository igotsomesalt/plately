import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import OnboardLayout from "./OnboardLayout";
import OnboardProgress from "./OnboardProgress";
import { completeWelcome } from "./onboardApi";
import { Button } from "../components/button";

export default function WelcomePage() {
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    async function onClick() {
        try {
            await completeWelcome();
            refreshUser();
            navigate("/onboard/name");
        }

        catch (e) {
            console.log(e.message);
        }
    }

    return (
        <OnboardLayout>
            <OnboardProgress currentStep={1} />

            <div className="text-center">
                <div className="mb-4">
                    <h1 className="fw-bold mb-3">
                        Welcome to Plately
                    </h1>

                    <p className="text-secondary mb-0">
                        Let's build your household profile so we can
                        create meal plans and shopping lists that fit
                        your needs.
                    </p>
                </div>

                <Button
                    className="w-100"
                    onClick={onClick}
                >
                    Get Started
                </Button>
            </div>
        </OnboardLayout>
    );
}