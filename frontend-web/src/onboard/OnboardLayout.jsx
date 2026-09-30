import "./Onboard.css";

export default function OnboardingLayout({ children }) {
    return (
        <main className="min-vh-100 bg-light d-flex align-items-center">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4 p-md-5">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
