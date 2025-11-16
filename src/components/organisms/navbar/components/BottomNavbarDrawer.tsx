"use client";

import { Drawer, Icon, Navbar } from "@/components";
import { useToggler } from "@/hooks/useToggler";

const BottomNavbarDrawer = () => {
  const [openDrawer, toggleOpenDrawer, close] = useToggler(false);

  return (
    <>
      <Icon icon="menu" onClick={toggleOpenDrawer} />
      <Drawer open={openDrawer} onClose={close}>
        <div role="presentation" className="h-full" style={{ width: "60dvw" }}>
          <Navbar onSelect={close} />
        </div>
      </Drawer>
    </>
  );
};

export default BottomNavbarDrawer;
