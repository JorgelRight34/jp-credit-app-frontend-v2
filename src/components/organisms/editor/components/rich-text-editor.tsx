import clsx from 'clsx'
import Editor from './editor'
import type { InputProps } from '@/components/atoms'

const RichTextEditorInput = ({
  value,
  children,
  onChange,
  className,
  readOnly,
}: InputProps & React.PropsWithChildren) => {
  return (
    <div
      className={clsx('w-full flex-1 shadow-sm rounded-xl', className)}
      data-color-mode="light"
    >
      <Editor
        content={value as string}
        onUpdate={({ editor }) => onChange?.(editor.getHTML())}
        placeholder="Sé el primero en dejar anotaciones"
        readOnly={readOnly}
      >
        {children}
      </Editor>
    </div>
  )
}

export default RichTextEditorInput
