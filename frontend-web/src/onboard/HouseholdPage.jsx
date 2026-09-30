import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import OnboardingLayout from "./OnboardLayout";
import OnboardingProgress from "./OnboardProgress";
import { updateHousehold } from "./onboardApi";
import Input from "../components/input/Input";
import { Button } from "../components/button";

export default function HouseholdPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [budget, setBudget] = useState("");

    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const { refreshUser } = useAuth();


    async function handleSubmit(event) {
        event.preventDefault();

        if (!name.trim()) {
            setError("Please enter a household name.");
            return;
        }

        console.log(budget);

        if (!budget || Number(budget) <= 0) {
            setError("Please enter a valid budget.");
            return;
        }

        setError("");
        setSaving(true);

        try {
            await updateHousehold(
                name.trim(),
                Number(budget)
            );

            refreshUser();
            navigate("/onboard/household/members");
        } catch (e) {
            console.error(e);

            setError(
                "Something went wrong while saving your household."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <OnboardingLayout>
            <OnboardingProgress currentStep={3} />

            <div className="mb-4">
                <h1 className="fw-bold mb-2">
                    Set up your household
                </h1>

                <p className="text-secondary mb-0">
                    Tell us a little about your household so we can
                    build meal plans around it.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Household Name */}
                <div className="mb-4">
                    <label
                        htmlFor="household-name"
                        className="form-label fw-semibold"
                    >
                        Household name
                    </label>

                    <Input
                        id="household-name"
                        type="text"
                        className={`${
                            error && !name.trim()
                                ? "is-invalid"
                                : ""
                        }`}
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        placeholder="e.g. Lowrey Family"
                        autoFocus
                    />
                </div>

                {/* Budget */}
                <div className="mb-4">
                    <label
                        htmlFor="household-budget"
                        className="form-label fw-semibold"
                    >
                        Weekly grocery budget
                    </label>

                    <div className="input-group">
                        <span className="input-group-text">
                            $
                        </span>

                        <Input
                            id="household-budget"
                            type="number"
                            className={`form-control ${
                                error &&
                                (!budget || Number(budget) <= 0)
                                    ? "is-invalid"
                                    : ""
                            }`}
                            value={budget}
                            onChange={(event) =>
                                setBudget(event.target.value)
                            }
                            placeholder="150"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="form-text">
                        This helps Plately build meal plans that
                        stay within your budget.
                    </div>
                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <div className="d-flex gap-2">
                    <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={() =>
                            navigate("/onboard/name")
                        }
                        disabled={saving}
                    >
                        Back
                    </Button>

                    <Button
                        type="submit"
                        className="flex-grow-1"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Continue"}
                    </Button>
                </div>
            </form>
        </OnboardingLayout>
    );
}