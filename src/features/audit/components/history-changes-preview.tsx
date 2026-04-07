import { ChangeLog } from '../models/changeLog'

interface FieldChange {
  Field: string
  OldValue: string | null
  NewValue: string | null
}

const HistoryChangesPreview = ({ original }: { original: ChangeLog }) => {
  const changes: FieldChange[] = JSON.parse(original.changes ?? '[]')

  if (!changes.length) return null

  return (
    <div className="flex flex-col gap-2 py-2">
      {changes.map((change) => (
        <div key={change.Field} className="grid grid-cols-3 gap-4 px-4 text-sm">
          <span className="text-muted-foreground font-medium">
            {change.Field}
          </span>
          <span className="text-muted-foreground line-through">
            {change.OldValue ? (
              <span dangerouslySetInnerHTML={{ __html: change.OldValue }} />
            ) : (
              <span className="italic">N/D</span>
            )}
          </span>
          <span className="text-foreground">
            {change.NewValue ? (
              <span dangerouslySetInnerHTML={{ __html: change.NewValue }} />
            ) : (
              <span className="text-muted-foreground italic">empty</span>
            )}
          </span>
        </div>
      ))}
    </div>
  )
}

export default HistoryChangesPreview
