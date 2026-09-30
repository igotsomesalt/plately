import "./Input.css";

export default function Input({
    variant = "plately",
    className = "",
    type = "text",
    ...props
}) {
    return (
        <input
            type={type}
            className={`${
                        type === "checkbox" ? 
                        `form-check-input form-check-input-${variant}` : 
                        `form-control form-control-${variant}`
                        }
                    ${className}`}
            {...props}
        />
    );
}