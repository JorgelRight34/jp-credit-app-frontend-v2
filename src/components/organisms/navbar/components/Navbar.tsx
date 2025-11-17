import "./_navbar.css";
import {
  accessControlNavItem,
  accountStatusNavItem,
  armotizationsNavItem,
  collateralsNavItem,
  financesNavItem,
  followUpsNavItem,
  loansNavItem,
  notesNavItem,
  profileNavItem,
  reportsNavItem,
  settingsNavItem,
  transactionsNavItem,
} from "../lib/navItems";
import NavbarHeader from "./NavbarHeader";
import NavbarFooter from "./NavbarFooter";
import NavbarSearch from "./NavbarSearch";
import { useState } from "react";
import clsx from "clsx";
import { NavItem } from "../models/navItem";
import logo from "@/public/horizontal-logo.png";
import { Icon } from "@/components/atoms";
import NavbarLinksContainer from "./NavbarLinksContainer";

const options = [
  profileNavItem,
  accessControlNavItem,
  accountStatusNavItem,
  collateralsNavItem,
  transactionsNavItem,
  notesNavItem,
  loansNavItem,
  followUpsNavItem,
  financesNavItem,
  reportsNavItem,
  armotizationsNavItem,
  settingsNavItem,
];

interface NavbarProps {
  onSelect?: (link: NavItem) => void;
}

/**
 * A navbar component that displays a list of navigation options and a logout button.
 * It uses React Router for navigation and Redux for state management.
 * @component
 * @returns {JSX.Element} The rendered navbar component.
 */
const Navbar = ({ onSelect }: NavbarProps) => {
  const [clickedNavOption, setClickedNavOption] = useState<
    NavItem | undefined
  >();
  const [searchResults, setSearchResults] = useState<NavItem[]>([]);

  const handleOnSelect = (option: NavItem) => {
    setClickedNavOption(option);
    onSelect?.(option);
  };

  return (
    <div className="side-navbar rounded-bottom-lg relative flex h-full w-full flex-col bg-white shadow-sm">
      <div className="border-bottom flex-shrink-0">
        <NavbarHeader src={logo} alt="logo" className="mb-0" />
      </div>
      <div className="flex-shrink-0 p-3">
        <NavbarSearch
          className="bg-active-transparent"
          options={options}
          onSearch={(results: NavItem[]) => {
            if (results.length > 0) {
              setSearchResults(results);
            }
          }}
        />
      </div>
      {/* Main Navigation Options */}
      <NavbarLinksContainer
        className={clsx({ hidden: clickedNavOption?.children?.length })}
        options={searchResults.length > 0 ? searchResults : options}
        onExpand={handleOnSelect}
      />
      <NavbarLinksContainer
        className={clsx({ hidden: !clickedNavOption?.children?.length })}
        options={clickedNavOption?.children || []}
        onExpand={handleOnSelect}
      >
        <div className="border-bottom border-top bg-active-transparent p-3 shadow-sm">
          <Icon
            className="hover-accent cursor-pointer text-center"
            icon="arrow_back"
            onClick={() => setClickedNavOption(undefined)}
          >
            Atrás / {clickedNavOption?.name}
          </Icon>
        </div>
      </NavbarLinksContainer>
      <div className="w-full flex-shrink-0 p-3">
        <NavbarFooter className="bg-active-transparent shadow-sm" />
      </div>
    </div>
  );
};

export default Navbar;
