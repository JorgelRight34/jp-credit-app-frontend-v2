import {
  AccentPillBtn,
  AddIcon,
  BigTitle,
  Icon,
  IconName,
  Link,
  LinkProps,
  SecondaryPillBtn,
  Subtitle,
} from '@/components'

interface GuardPanelProps {
  title: React.ReactNode
  subtitle: React.ReactNode
  createLink: LinkProps['to']
  createLinkSearch?: LinkProps['search']
  createLabel: React.ReactNode
  secondaryLink?: LinkProps['to']
  secondaryLabel?: React.ReactNode
  icon: IconName
  createIcon?: IconName
  secondaryIcon?: IconName
}

const GuardPanel = ({
  title,
  subtitle,
  createLink,
  createLabel,
  secondaryLink,
  secondaryLabel,
  icon,
  secondaryIcon,
  createIcon = AddIcon,
}: GuardPanelProps) => {
  const hasSecondary = secondaryLink && secondaryLabel && secondaryIcon

  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <div className="flex justify-center">
        <Icon
          icon={icon}
          iconClassName="!text-9xl"
          className="text-secondary mx-auto mb-5"
        />
      </div>
      <header className="mb-12 space-y-3 px-0 md:px-6">
        <BigTitle className="mb-6 text-center text-2xl font-semibold text-gray-800">
          {title}
        </BigTitle>
        <Subtitle className="leading-relaxed">{subtitle}</Subtitle>
      </header>
      <div className="flex flex-col gap-6 px-0 md:flex-row md:px-6">
        {hasSecondary && (
          <Link className="w-full md:w-6/12" to={secondaryLink}>
            <SecondaryPillBtn icon={secondaryIcon}>
              {secondaryLabel}
            </SecondaryPillBtn>
          </Link>
        )}
        <Link
          className={hasSecondary ? 'w-full md:w-6/12' : 'w-full'}
          to={createLink}
        >
          <AccentPillBtn icon={createIcon}>{createLabel}</AccentPillBtn>
        </Link>
      </div>
    </div>
  )
}

export default GuardPanel
