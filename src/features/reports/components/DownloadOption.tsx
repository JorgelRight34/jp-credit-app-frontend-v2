import { ReactNode } from "react";
import { FaCheck } from "react-icons/fa";

interface DownloadOptionProps {
  className?: string;
  icon: ReactNode;
  onClick?: () => void;
  title: string;
  subtitle: string;
  selected?: boolean;
}

const DownloadOption = ({
  className = "",
  icon,
  title = "",
  subtitle = "",
  onClick,
  selected = false,
}: DownloadOptionProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
        selected
          ? "bg-blue-50 border-2 border-blue-200"
          : "border-2 border-transparent"
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <span className="text-gray-800 font-medium block">{title}</span>
          <span className="text-sm text-gray-500">{subtitle}</span>
        </div>
      </div>
      {selected && (
        <div className="bg-blue-600 text-white rounded-full p-1">
          <FaCheck size={16} />
        </div>
      )}
    </div>
  );
};

export default DownloadOption;
