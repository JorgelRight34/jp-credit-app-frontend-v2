import { Icon } from '../../icon'
import { IconName } from '../../icon/models/iconName'
import Container, { ContainerProps } from './container'

interface ContainerWithTitleProps extends ContainerProps {
  title?: string
  icon?: IconName
}

const ContainerWithTitle = ({
  title,
  icon,
  children,
  ...props
}: ContainerWithTitleProps) => {
  return (
    <Container {...props}>
      <div className="flex justify-start border-b py-1">
        <Icon icon={icon} labelClassName="text-1xl">
          {title}
        </Icon>
      </div>
      {children}
    </Container>
  )
}

export default ContainerWithTitle
