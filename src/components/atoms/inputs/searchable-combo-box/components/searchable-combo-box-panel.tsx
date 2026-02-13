import { PropsWithChildren } from 'react'
import { SecondaryBtn } from '../../../button'

interface SearchableComboboxPanelProps extends PropsWithChildren {
  reset: () => void
}

const SearchableComboboxPanel = ({
  reset,
  children,
}: SearchableComboboxPanelProps) => {
  return (
    <div className="flex">
      <section className="flex-1">{children}</section>
      <aside className="flex items-center py-3">
        <SecondaryBtn onClick={reset} />
      </aside>
    </div>
  )
}

export default SearchableComboboxPanel
