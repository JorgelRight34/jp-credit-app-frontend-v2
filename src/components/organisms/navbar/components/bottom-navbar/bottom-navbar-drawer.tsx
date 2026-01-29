import Navbar from '../side-navbar/navbar'
import { Icon, MenuIcon } from '@/components/atoms'
import { Drawer } from '@/components/molecules'
import { useToggler } from '@/hooks/useToggler'

const BottomNavbarDrawer = () => {
  const [openDrawer, toggleOpenDrawer, close] = useToggler(false)

  return (
    <>
      <Icon icon={MenuIcon} onClick={toggleOpenDrawer} />
      <Drawer open={openDrawer} onClose={close}>
        <div role="presentation" className="h-full" style={{ width: '60dvw' }}>
          <Navbar onSelect={close} />
        </div>
      </Drawer>
    </>
  )
}

export default BottomNavbarDrawer
