import { ReactNode } from "react";
import { FaCheck } from "react-icons/fa";

interface DownloadOptionProps {
  className?: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  selected?: boolean;
  onClick?: () => void;
}

const DownloadOption = ({
  className = "",
  icon,
  title = "",
  subtitle = "",
  selected = false,
  onClick,
}: DownloadOptionProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-between rounded-lg p-2 transition-all duration-200 hover:bg-gray-50 ${
        selected
          ? "border-2 border-blue-200 bg-blue-50"
          : "border-2 border-transparent"
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <span className="block font-medium text-gray-800">{title}</span>
          <span className="text-sm text-gray-500">{subtitle}</span>
        </div>
      </div>
      {selected && (
        <div className="rounded-full bg-blue-600 p-1 text-white">
          <FaCheck size={16} />
        </div>
      )}
    </div>
  );
};

export default DownloadOption;
