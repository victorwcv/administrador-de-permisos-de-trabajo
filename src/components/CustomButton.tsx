interface CustomButtonProps {
  color?: string;
  textColor?: string;
  btnStyles?: string;
  label?: string;
  icon?: JSX.Element;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  title?: string;
}
function CustomButton({
  color = "bg-accent-500 hover:bg-accent-600 focus:ring-accent-500",
  textColor = "text-white",
  btnStyles = "",
  label,
  icon,
  onClick,
  type = "button",
  disabled = false,
  title,
}: CustomButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${btnStyles} ${textColor} ${color} flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all`}
      title={title}
    >
      {label}
      {icon}
    </button>
  );
}

export default CustomButton;
