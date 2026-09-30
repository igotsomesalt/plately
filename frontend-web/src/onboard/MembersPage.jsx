import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import OnboardingLayout from "./OnboardLayout";
import OnboardingProgress from "./OnboardProgress";
import { createMember } from "../member/memberApi";
import { finish } from "./onboardApi";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Select } from "../components/select";

const ALLERGENS = [
    ["DAIRY", "Dairy"],
    ["EGGS", "Eggs"],
    ["FISH", "Fish"],
    ["GLUTEN", "Gluten"],
    ["MILK", "Milk"],
    ["PEANUTS", "Peanuts"],
    ["SHELLFISH", "Shellfish"],
    ["SOYBEANS", "Soybeans"],
    ["SESAME", "Sesame"],
    ["TREE_NUTS", "Tree nuts"],
    ["WHEAT", "Wheat"],
];

const emptyMember = {
    name: "",
    dietType: "",
    allergies: [],
    ageYrs: "",
    heightMeters: "",
    weightKgs: "",
    weightGoalKgs: "",
};

export default function MembersPage() {
    const navigate = useNavigate();

    const [members, setMembers] = useState([
        { ...emptyMember },
    ]);

    const [expandedMembers, setExpandedMembers] = useState(
        new Set([0])
    );

    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const { refreshUser } = useAuth();

    function updateMember(index, field, value) {
        setMembers((current) =>
            current.map((member, memberIndex) =>
                memberIndex === index
                    ? { ...member, [field]: value }
                    : member
            )
        );
    }

    function toggleMember(index) {
        setExpandedMembers((current) => {
            const next = new Set(current);

            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }

            return next;
        });
    }

    function addNewMember() {
        const newIndex = members.length;

        setMembers((current) => [
            ...current,
            {
                ...emptyMember,
                allergies: [],
            },
        ]);

        setExpandedMembers((current) => {
            const next = new Set(current);
            next.add(newIndex);
            return next;
        });
    }

    function removeMember(index) {
        setMembers((current) =>
            current.filter((_, memberIndex) => memberIndex !== index)
        );

        setExpandedMembers((current) => {
            const next = new Set();

            current.forEach((memberIndex) => {
                if (memberIndex < index) {
                    next.add(memberIndex);
                } else if (memberIndex > index) {
                    next.add(memberIndex - 1);
                }
            });

            return next;
        });
    }

    function toggleAllergen(index, allergen) {
        const member = members[index];

        const allergies = member.allergies.includes(allergen)
            ? member.allergies.filter(
                  (current) => current !== allergen
              )
            : [...member.allergies, allergen];

        updateMember(index, "allergies", allergies);
    }

    function validateMembers() {
        for (const member of members) {
            if (!member.name.trim()) {
                return "Every member needs a name.";
            }

            if (!member.dietType) {
                return "Please select a diet for every member.";
            }

            if (!member.ageYrs || Number(member.ageYrs) <= 0) {
                return "Please enter a valid age for every member.";
            }

            if (
                !member.heightMeters ||
                Number(member.heightMeters) <= 0
            ) {
                return "Please enter a valid height for every member.";
            }

            if (
                !member.weightKgs ||
                Number(member.weightKgs) <= 0
            ) {
                return "Please enter a valid weight for every member.";
            }

            if (
                !member.weightGoalKgs ||
                Number(member.weightGoalKgs) <= 0
            ) {
                return "Please enter a valid weight goal for every member.";
            }
        }

        return null;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationError = validateMembers();

        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        setSaving(true);

        try {
            for (const member of members) {
                await createMember({
                    name: member.name.trim(),
                    dietType: member.dietType,
                    allergies: member.allergies,
                    ageYrs: Number(member.ageYrs),
                    heightMeters: Number(member.heightMeters),
                    weightKgs: Number(member.weightKgs),
                    weightGoalKgs: Number(member.weightGoalKgs),
                });
            }

            await finish();
            refreshUser();
            navigate("/dashboard");
        } catch (e) {
            console.error(e);

            setError(
                "Something went wrong while saving your household members."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <OnboardingLayout>
            <OnboardingProgress currentStep={4} />

            <div className="mb-4">
                <h1 className="fw-bold mb-2">
                    Who are you planning for?
                </h1>

                <p className="text-secondary mb-0">
                    Add everyone whose dietary needs should be considered.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="vstack gap-3 mb-4">
                    {members.map((member, index) => {
                        const isExpanded = expandedMembers.has(index);

                        return (
                            <div className="card" key={index}>
                                {/* Member header */}
                                <div className="card-header bg-white p-0">
                                    <div className="d-flex align-items-center">
                                        <button
                                            type="button"
                                            className="btn btn-link text-decoration-none text-dark text-start flex-grow-1 p-3"
                                            onClick={() =>
                                                toggleMember(index)
                                            }
                                        >
                                            <div className="fw-semibold">
                                                {member.name.trim() ||
                                                    `Member ${index + 1}`}
                                            </div>

                                            {member.ageYrs && (
                                                <div className="small text-secondary mt-1">
                                                    {member.ageYrs} years old
                                                </div>
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger me-3"
                                            onClick={() =>
                                                removeMember(index)
                                            }
                                            disabled={saving}
                                        >
                                            Remove
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-link text-secondary p-3"
                                            onClick={() =>
                                                toggleMember(index)
                                            }
                                            aria-label={
                                                isExpanded
                                                    ? "Collapse member"
                                                    : "Expand member"
                                            }
                                        >
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    transform: isExpanded
                                                        ? "rotate(180deg)"
                                                        : "rotate(0deg)",
                                                    transition:
                                                        "transform 0.15s ease",
                                                }}
                                            >
                                                ▼
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Member form */}
                                {isExpanded && (
                                    <div className="card-body p-3">
                                        {/* Name */}
                                        <div className="mb-3">
                                            <label
                                                htmlFor={`name-${index}`}
                                                className="form-label"
                                            >
                                                Name
                                            </label>

                                            <Input
                                                id={`name-${index}`}
                                                value={member.name}
                                                onChange={(event) =>
                                                    updateMember(
                                                        index,
                                                        "name",
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="Member's name"
                                            />
                                        </div>

                                        {/* Diet */}
                                        <div className="mb-3">
                                            <label
                                                htmlFor={`diet-${index}`}
                                                className="form-label"
                                            >
                                                Diet
                                            </label>

                                            <Select
                                                id={`diet-${index}`}
                                                value={member.dietType}
                                                onChange={(event) =>
                                                    updateMember(
                                                        index,
                                                        "dietType",
                                                        event.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Select a diet
                                                </option>

                                                <option value="NONE">
                                                    No specific diet
                                                </option>

                                                <option value="VEGAN">
                                                    Vegan
                                                </option>

                                                <option value="VEGETARIAN">
                                                    Vegetarian
                                                </option>

                                                <option value="PESCATARIAN">
                                                    Pescatarian
                                                </option>

                                                <option value="MEDITERRANEAN">
                                                    Mediterranean
                                                </option>

                                                <option value="LOW_CARB">
                                                    Low Carb
                                                </option>

                                                <option value="KETO">
                                                    Keto
                                                </option>

                                                <option value="RENAL">
                                                    Renal
                                                </option>

                                                <option value="PUREED">
                                                    Pureed
                                                </option>

                                                <option value="BABY">
                                                    Baby
                                                </option>
                                            </Select>
                                        </div>

                                        {/* Allergies */}
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Allergies
                                            </label>

                                            <div className="row row-cols-1 row-cols-sm-2 g-2">
                                                {ALLERGENS.map(
                                                    ([value, label]) => (
                                                        <div
                                                            className="col"
                                                            key={value}
                                                        >
                                                            <div className="form-check">
                                                                <Input
                                                                    id={`${value}-${index}`}
                                                                    type="checkbox"
                                                                    checked={member.allergies.includes(
                                                                        value
                                                                    )}
                                                                    onChange={() =>
                                                                        toggleAllergen(
                                                                            index,
                                                                            value
                                                                        )
                                                                    }
                                                                />

                                                                <label
                                                                    htmlFor={`${value}-${index}`}
                                                                    className="form-check-label"
                                                                >
                                                                    {label}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* Age */}
                                        <div className="mb-3">
                                            <label
                                                htmlFor={`age-${index}`}
                                                className="form-label"
                                            >
                                                Age
                                            </label>

                                            <Input
                                                id={`age-${index}`}
                                                type="number"
                                                className="form-control"
                                                value={member.ageYrs}
                                                onChange={(event) =>
                                                    updateMember(
                                                        index,
                                                        "ageYrs",
                                                        event.target.value
                                                    )
                                                }
                                                min="1"
                                                placeholder="Age in years"
                                            />
                                        </div>

                                        {/* Height */}
                                        <div className="mb-3">
                                            <label
                                                htmlFor={`height-${index}`}
                                                className="form-label"
                                            >
                                                Height (meters)
                                            </label>

                                            <Input
                                                id={`height-${index}`}
                                                type="number"
                                                value={member.heightMeters}
                                                onChange={(event) =>
                                                    updateMember(
                                                        index,
                                                        "heightMeters",
                                                        event.target.value
                                                    )
                                                }
                                                min="0"
                                                step="0.01"
                                                placeholder="e.g. 1.80"
                                            />
                                        </div>

                                        {/* Weight */}
                                        <div className="mb-3">
                                            <label
                                                htmlFor={`weight-${index}`}
                                                className="form-label"
                                            >
                                                Current Weight (kg)
                                            </label>

                                            <Input
                                                id={`weight-${index}`}
                                                type="number"
                                                value={member.weightKgs}
                                                onChange={(event) =>
                                                    updateMember(
                                                        index,
                                                        "weightKgs",
                                                        event.target.value
                                                    )
                                                }
                                                min="0"
                                                step="0.1"
                                                placeholder="e.g. 70"
                                            />
                                        </div>

                                        {/* Weight Goal */}
                                        <div>
                                            <label
                                                htmlFor={`weight-goal-${index}`}
                                                className="form-label"
                                            >
                                                Weight Goal (kg)
                                            </label>

                                            <Input
                                                id={`weight-goal-${index}`}
                                                type="number"
                                                value={member.weightGoalKgs}
                                                onChange={(event) =>
                                                    updateMember(
                                                        index,
                                                        "weightGoalKgs",
                                                        event.target.value
                                                    )
                                                }
                                                min="0"
                                                step="0.1"
                                                placeholder="e.g. 75"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <Button
                    type="button"
                    variant="outline-secondary"
                    className="w-100 mb-3"
                    onClick={addNewMember}
                    disabled={saving}
                >
                    + Add another member
                </Button>

                <div className="d-flex gap-2">
                    <Button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                            navigate("/onboard/household")
                        }
                        disabled={saving}
                    >
                        Back
                    </Button>

                    <Button
                        className="flex-grow-1"
                        disabled={saving}
                        onClick={handleSubmit}
                    >
                        {saving ? "Saving..." : "Finish Setup"}
                    </Button>
                </div>
            </form>
        </OnboardingLayout>
    );
}