import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import OnboardLayout from "./OnboardLayout";
import OnboardProgress from "./OnboardProgress";
import { updateName } from "./onboardApi";
import Input from "../components/input/Input";
import { Button } from "../components/button";

export default function NamePage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [error, setError] = useState("");

    
    const { refreshUser } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();

        setName(name.trim());
        
        if (name.includes(" ")) {
            setError("First name only");
            return;
        }

        if (name.length > 12) {
            setError("Name must be 12 characters or less");
            return;
        }

        if (!/^[a-zA-Z]+$/.test(name)) {
            setError("Name must only contain letters");
            return;
        }

        try { 
            await updateName(name);
            console.log("updated name");
            refreshUser();
            console.log("refreshed user");
            navigate("/onboard/household");
            console.log("navigated");
        }
        catch (e) {
            setError("Something went wrong");
        }
    }

    return (
        <OnboardLayout>
            <OnboardProgress currentStep={2} />

            <div className="mb-4">
                <h1 className="fw-bold mb-2">
                    What's your name?
                </h1>

                <p className="text-secondary mb-0">
                    We'll use this to personalize your Plately experience.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label fw-semibold">
                        Name
                    </label>

                    <Input
                        id="name"
                        type="text"
                        className={` ${
                            error ? "is-invalid" : ""
                        }`}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter your name"
                        autoFocus
                    />

                    {error && (
                        <div className="invalid-feedback">
                            {error}
                        </div>
                    )}
                </div>

                <div className="d-flex gap-2">
                    <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={() => navigate("/onboard/welcome")}
                    >
                        Back
                    </Button>

                    <Button
                        type="submit"
                        className="flex-grow-1"
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </OnboardLayout>
    );
}