export interface RuleListItemProps {
  icon: string
  children: React.ReactNode
}

const RuleListItem = ({ icon, children }: RuleListItemProps) => (
  <li className="flex items-start gap-2 text-gray-700">
    <span className="mt-0.5 text-accent">{icon}</span>
    <span>{children}</span>
  </li>
)

export default RuleListItem
