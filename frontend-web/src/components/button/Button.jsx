import "./Button.css";

export default function Button({
    children,
    variant = "plately",
    type = "button",
    onClick,
    className = ""
}) {
    return (
        <button
            className={`btn btn-${variant} ${className}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}