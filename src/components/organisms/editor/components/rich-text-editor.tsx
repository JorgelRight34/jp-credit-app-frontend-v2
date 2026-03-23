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
      className={clsx(
        'min-h-[16rem] w-full flex-1 rounded-xl shadow-sm md:min-h-[8rem]',
        className,
      )}
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
