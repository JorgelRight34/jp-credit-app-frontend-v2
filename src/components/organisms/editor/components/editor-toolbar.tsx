import clsx from 'clsx'
import { useState } from 'react'
import type { Editor } from '@tiptap/react'
import type { IconName } from '@/components/atoms/icon/models/iconName'
import {
  CodeIcon,
  FormatBoldIcon,
  FormatItalicIcon,
  FormatListBulletedIcon,
  FormatListNumberedIcon,
  FormatQuoteIcon,
  FormatStrikethroughIcon,
  HorizontalRuleIcon,
  Icon,
  Looks3Icon,
  LooksOneIcon,
  LooksTwoIcon,
  RedoIcon,
  UndoIcon,
} from '@/components/atoms'

interface EditorToolBarProps {
  editor: Editor | null
  className?: string
}

const EditorToolBar = ({ editor, className }: EditorToolBarProps) => {
  const [, forceUpdate] = useState({})

  if (!editor) return null

  editor.on('selectionUpdate', () => forceUpdate({}))
  editor.on('transaction', () => forceUpdate({}))

  return (
    <div
      className={clsx(
        'bg-stone-30 flex flex-wrap items-center gap-x-1 gap-y-1 border-b p-1.5 sm:p-2',
        className,
      )}
    >
      {/* Text Formatting */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={FormatBoldIcon}
          title="Bold (Ctrl+B)"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={FormatItalicIcon}
          title="Italic (Ctrl+I)"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          icon={FormatStrikethroughIcon}
          title="Strikethrough"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          icon={CodeIcon}
          title="Inline Code"
        />
      </div>

      <Separator />

      {/* Headings */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive('heading', { level: 1 })}
          icon={LooksOneIcon}
          title="Heading 1"
        />
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive('heading', { level: 2 })}
          icon={LooksTwoIcon}
          title="Heading 2"
        />
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive('heading', { level: 3 })}
          icon={Looks3Icon}
          title="Heading 3"
        />
      </div>

      <Separator />

      {/* Lists */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={FormatListBulletedIcon}
          title="Bullet List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={FormatListNumberedIcon}
          title="Numbered List"
        />
      </div>

      <Separator />

      {/* Block Elements */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          icon={FormatQuoteIcon}
          title="Blockquote"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          icon={CodeIcon}
          title="Code Block"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          icon={HorizontalRuleIcon}
          title="Horizontal Rule"
        />
      </div>

      {/* History — pushed to end, never wraps alone */}
      <div className="ml-auto flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          icon={UndoIcon}
          title="Undo (Ctrl+Z)"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          icon={RedoIcon}
          title="Redo (Ctrl+Y)"
        />
      </div>
    </div>
  )
}

interface ToolbarButtonProps {
  isActive?: boolean
  disabled?: boolean
  icon: IconName
  title: string
  onClick: () => void
}

const ToolbarButton = ({
  isActive,
  disabled,
  icon,
  title,
  onClick,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      type="button"
      className={clsx(
        'text-primary rounded p-1.5 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent sm:p-2',
        isActive && 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      )}
    >
      <Icon icon={icon} style={{ fontSize: '1rem' }} />
    </button>
  )
}

const Separator = () => (
  <div className="mx-0.5 h-5 w-px bg-gray-300 sm:mx-1 sm:h-6" />
)

export default EditorToolBar
