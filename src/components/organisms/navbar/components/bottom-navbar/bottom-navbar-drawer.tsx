import Navbar from '../side-navbar/navbar'
import { Icon, MenuIcon } from '@/components/atoms'
import { Drawer } from '@/components/molecules'
import { useLocation } from '@/hooks/useLocation'
import { useToggler } from '@/hooks/useToggler'
import { useEffect } from 'react'

const BottomNavbarDrawer = () => {
  const [openDrawer, toggleOpenDrawer, close] = useToggler(false)
  const pathname = useLocation({ select: (l) => l.pathname })

  useEffect(() => {
    close()
  }, [pathname])

  return (
    <>
      <Icon
        iconClassName="text-secondary"
        icon={MenuIcon}
        onClick={toggleOpenDrawer}
      />
      <Drawer open={openDrawer} onClose={close}>
        <div role="presentation" className="h-full" style={{ width: '60dvw' }}>
          <Navbar />
        </div>
      </Drawer>
    </>
  )
}

export default BottomNavbarDrawer
