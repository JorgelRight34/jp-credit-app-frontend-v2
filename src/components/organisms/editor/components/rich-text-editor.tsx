import Editor from './editor'
import type { InputProps } from '@/components/atoms'

const RichTextEditorInput = ({
  value,
  children,
  onChange,
  readOnly,
}: InputProps & React.PropsWithChildren) => {
  return (
    <div className="h-100 w-full shadow-sm rounded-xl" data-color-mode="light">
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
