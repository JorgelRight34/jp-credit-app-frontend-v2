import Navbar from '../side-navbar/navbar'
import { Icon, IconProps, SearchIcon } from '@/components/atoms'
import { Drawer } from '@/components/molecules'
import { useLocation } from '@/hooks/useLocation'
import { useToggler } from '@/hooks/useToggler'
import { PropsWithUser } from '@/models/user'
import { useEffect } from 'react'

const BottomNavbarDrawer = ({ user, ...props }: PropsWithUser<IconProps>) => {
  const [openDrawer, toggleOpenDrawer, close] = useToggler(false)
  const pathname = useLocation({ select: (l) => l.pathname })

  useEffect(() => {
    close()
  }, [pathname])

  return (
    <>
      <Icon {...props} icon={SearchIcon} onClick={toggleOpenDrawer} />
      <Drawer open={openDrawer} onClose={close}>
        <div role="presentation" className="h-full w-[70dvw]">
          <Navbar user={user} />
        </div>
      </Drawer>
    </>
  )
}

export default BottomNavbarDrawer
