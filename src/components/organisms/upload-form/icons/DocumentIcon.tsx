import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileAlt,
  FaFileImage,
  FaFileArchive,
} from "react-icons/fa";

interface DocumentIconProps {
  type?: string;
  size?: number;
  className?: string;
  color?: string;
}

const icons = {
  ".pdf": (props: { className?: string; size: number }) => (
    <FaFilePdf {...props} color="#e74c3c" />
  ),
  ".docx": (props: { className?: string; size: number }) => (
    <FaFileWord {...props} color="#2b579a" />
  ),
  ".xlsx": (props: { className?: string; size: number }) => (
    <FaFileExcel {...props} color="#217346" />
  ),
  ".txt": (props: { className?: string; size: number; color: string }) => (
    <FaFileAlt {...props} />
  ),
  ".png": (props: { className?: string; size: number }) => (
    <FaFileImage {...props} color="#3498db" />
  ),
  ".jpg": (props: { className?: string; size: number }) => (
    <FaFileImage {...props} color="#3498db" />
  ),
  ".jpeg": (props: { className?: string; size: number }) => (
    <FaFileImage {...props} color="#3498db" />
  ),
  ".zip": (props: { className?: string; size: number }) => (
    <FaFileArchive {...props} color="#9b59b6" />
  ),
} as const;

const DocumentIcon = ({
  type,
  size = 24,
  className,
  color = "#555",
}: DocumentIconProps) => {
  const IconRenderer = icons[type as keyof typeof icons];

  // Render matching icon or fallback
  return IconRenderer ? (
    <IconRenderer className={className} size={size} color={color} />
  ) : (
    <FaFileAlt className={className} size={size} color={color} />
  );
};

export default DocumentIcon;
