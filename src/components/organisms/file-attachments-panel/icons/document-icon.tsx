import CsvIcon from './csv-icon'
import ExcelIcon from './excel-icon'
import JpegIcon from './jpeg-icon'
import JpgIcon from './jpg-icon'
import PdfIcon from './pdf-icon'
import PngIcon from './png-icon'
import TxtIcon from './txt-icon'
import WordIcon from './word-icon'
import ZipIcon from './zip-icon'
import type { FileIconProps } from '../models/fileIconProps'

interface DocumentIconProps {
  type?: string
  size?: number
  className?: string
  color?: string
}

const icons = {
  pdf: (props: FileIconProps) => <PdfIcon {...props} color="#e74c3c" />,
  docx: (props: FileIconProps) => <WordIcon {...props} color="#2b579a" />,
  xlsx: (props: FileIconProps) => <ExcelIcon {...props} color="#217346" />,
  txt: (props: { className?: string; size: number; color: string }) => (
    <TxtIcon {...props} />
  ),
  png: (props: FileIconProps) => <PngIcon {...props} color="#3498db" />,
  jpg: (props: FileIconProps) => <JpgIcon {...props} color="#3498db" />,
  jpeg: (props: FileIconProps) => <JpegIcon {...props} color="#3498db" />,
  zip: (props: FileIconProps) => <ZipIcon {...props} color="#9b59b6" />,
  csv: (props: FileIconProps) => <CsvIcon {...props} color="#3498db" />,
} as const

const DocumentIcon = ({
  type,
  size = 24,
  className,
  color = '#555',
}: DocumentIconProps) => {
  const IconRenderer = icons[type as keyof typeof icons]

  return <IconRenderer className={className} size={size} color={color} />
}

export default DocumentIcon
