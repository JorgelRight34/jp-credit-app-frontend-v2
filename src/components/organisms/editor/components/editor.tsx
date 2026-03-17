import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import EditorToolBar from './editor-toolbar'
import type { UseEditorOptions } from '@tiptap/react'

type EditorProps = Partial<UseEditorOptions> &
  React.PropsWithChildren & {
    className?: string
    placeholder?: string
    readOnly?: boolean
  }

const Editor = ({
  extensions = [],
  className,
  content,
  placeholder,
  readOnly,
  children,
  onUpdate,
}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      ...extensions,
    ],
    editable: readOnly === true ? false : true,
    content,
    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none p-2 focus:outline-none focus:ring-1 h-full focus:ring-green-900 rounded-b-md`,
      },
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    onUpdate,
  })

  useEffect(() => {
    if (!content && editor?.getHTML()) {
      editor.commands.setContent('')
    }
  }, [content])

  return (
    <div
      className={clsx('bg-surface flex h-full flex-col rounded-xl', className)}
    >
      <EditorToolBar
        className="flex-shrink-0 rounded-t-xl border"
        editor={editor}
      />

      <EditorContent
        editor={editor}
        className="text-secondary flex-1 rounded-b-xl border [&_ProseMirror]:overflow-y-auto"
      />
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}

export default Editor
