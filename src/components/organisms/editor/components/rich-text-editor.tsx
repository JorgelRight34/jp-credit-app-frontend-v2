import Editor from './editor'
import type { InputProps } from '@/components/atoms'

const RichTextEditorInput = ({
  value,
  children,
  onChange,
}: InputProps & React.PropsWithChildren) => {
  return (
    <div className="h-100 w-full shadow-sm" data-color-mode="light">
      <Editor
        content={value as string}
        onUpdate={({ editor }) => onChange?.(editor.getHTML())}
        placeholder="Sé el primero en dejar anotaciones"
      >
        {children}
      </Editor>
    </div>
  )
}

export default RichTextEditorInput
