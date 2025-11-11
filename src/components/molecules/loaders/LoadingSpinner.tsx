import clsx from "clsx";

type LoadingSpinnerProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
};

const LoadingSpinner = ({
  size = "lg",
  className = "",
  style,
  ...props
}: LoadingSpinnerProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center h-full w-full",
        className
      )}
      style={style}
    >
      <div
        className={clsx(
          `spinner-border m-0 spinner-border-${size} text-accent`,
          className
        )}
        role="status"
        {...props}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
