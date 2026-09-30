import "./Option.css";

export default function Option({
    variant = "plately",
    className = "",
    children,
    ...props
}) {
    return (
        <option
            className={`option-${variant} ${className}`}
            {...props}
        >
            {children}
        </option>
    );
}