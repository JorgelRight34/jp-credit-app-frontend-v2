// components/ui/Menu.tsx
import { IconName } from "@/models";
import { MenuProps, Menu as MuiMenu } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import MenuItem from "./MenuItem";
import Icon from "./Icon";

export interface MenuOption {
  label: string;
  onClick?: () => void;
  icon?: IconName;
  disabled?: boolean;
}

export interface MenuRef {
  close: () => void;
  open: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

type MenuRefProps = Omit<MenuProps, "open"> & {
  options?: MenuOption[];
};

const Menu = forwardRef<MenuRef, MenuRefProps>(
  ({ options = [], ...props }, ref) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    useImperativeHandle(ref, () => ({
      close: handleMenuClose,
      open: handleMenuOpen,
    }));

    return (
      <MuiMenu
        {...props}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={option.onClick}>
            <Icon icon={option.icon} label={option.label} />
          </MenuItem>
        ))}
      </MuiMenu>
    );
  },
);

export default Menu;
