import "./Select.css";

export default function Select({
    variant = "plately",
    className = "",
    children,
    ...props
}) {
    return (
        <select
            className={`form-select select-${variant} ${className}`}
            {...props}
        >
            {children}
        </select>
    );
}