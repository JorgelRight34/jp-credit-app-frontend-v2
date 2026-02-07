import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import clsx from 'clsx'
import React from 'react'
import EditorToolBar from './editor-toolbar'
import type { UseEditorOptions } from '@tiptap/react'

type EditorProps = Partial<UseEditorOptions> &
  React.PropsWithChildren & {
    className?: string
    placeholder?: string
  }

const Editor = ({
  extensions = [],
  className,
  content,
  placeholder,
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

  return (
    <div className={clsx('flex h-full flex-col bg-white', className)}>
      <EditorToolBar
        className="flex-shrink-0 rounded-t-xl border"
        editor={editor}
      />
      <EditorContent
        editor={editor}
        className="flex-1 border [&_ProseMirror]:overflow-y-auto"
      />
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}

export default Editor
