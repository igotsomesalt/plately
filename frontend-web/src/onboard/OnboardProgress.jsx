const steps = [
    "Welcome",
    "Your Name",
    "Household",
    "Members",
];

export default function OnboardProgress({ currentStep }) {
    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between small text-secondary mb-2">
                <span>Step {currentStep} of {steps.length}</span>
                <span>{steps[currentStep - 1]}</span>
            </div>

            <div
                className="progress"
                role="progressbar"
                aria-valuenow={currentStep}
                aria-valuemin="1"
                aria-valuemax={steps.length}
                style={{ height: "6px" }}
            >
                <div
                    className="progress-bar"
                    style={{
                        width: `${(currentStep / steps.length) * 100}%`,
                        backgroundColor: "var(--accent)"
                    }}
                />
            </div>
        </div>
    );
}
