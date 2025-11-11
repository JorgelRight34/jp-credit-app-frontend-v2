import "./_navbar.css";
import {
  accessControlNavOption,
  accountStatusNavOption,
  armotizationsNavOption,
  collateralsNavOption,
  financesNavOption,
  followUpsNavOption,
  loansNavOption,
  notesNavOption,
  profileNavOption,
  reportsNavOption,
  settingsNavOption,
  transactionsNavOption,
} from "./navOptions";
import NavbarHeader from "./NavbarHeader";
import NavbarFooter from "./NavbarFooter";
import NavbarSearch from "./NavbarSearch";
import { useState } from "react";
import { LOGOS } from "../../utils/constants";
import clsx from "clsx";
import { Icon } from "../ui";
import NavOptionsContainer from "./NavOptionsContainer";
import { NavbarLink } from "./navbarLink";

const options = [
  profileNavOption,
  accessControlNavOption,
  accountStatusNavOption,
  collateralsNavOption,
  transactionsNavOption,
  notesNavOption,
  loansNavOption,
  followUpsNavOption,
  financesNavOption,
  reportsNavOption,
  armotizationsNavOption,
  settingsNavOption,
];

/**
 * A navbar component that displays a list of navigation options and a logout button.
 * It uses React Router for navigation and Redux for state management.
 * @component
 * @returns {JSX.Element} The rendered navbar component.
 */
const Navbar = () => {
  const [clickedNavOption, setClickedNavOption] = useState<
    NavbarLink | undefined
  >();
  const [searchResults, setSearchResults] = useState<NavbarLink[]>([]);

  const handleOnSearch = (results: NavbarLink[]) => {
    if (results.length > 0) {
      setSearchResults(results);
    }
  };

  return (
    <div className="side-navbar rounded-bottom-lg relative flex h-full w-full flex-col bg-white shadow-sm">
      <div className="border-bottom flex-shrink-0">
        {/* "horizontal-logo.png" for horizontal and "header.jpg" for header */}
        <NavbarHeader img={LOGOS.horizontal} className="mb-0" />
      </div>
      <div className="flex-shrink-0 p-3">
        <NavbarSearch
          className="bg-active-transparent"
          options={options}
          onSearch={handleOnSearch}
        />
      </div>
      {/* Main Navigation Options */}
      <NavOptionsContainer
        className={clsx({ hidden: clickedNavOption?.children?.length })}
        options={searchResults.length > 0 ? searchResults : options}
        onExpand={setClickedNavOption}
      />
      <NavOptionsContainer
        className={clsx({ hidden: !clickedNavOption?.children?.length })}
        options={clickedNavOption?.children || []}
        onExpand={setClickedNavOption}
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
      </NavOptionsContainer>
      <div className="w-full flex-shrink-0 p-3">
        <NavbarFooter className="bg-active-transparent shadow-sm" />
      </div>
    </div>
  );
};

export default Navbar;
