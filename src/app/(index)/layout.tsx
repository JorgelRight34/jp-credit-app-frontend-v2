import { ReactNode } from "react";
import Navbar from "../components/Navbar/Navbar";
import BottomNavbar from "../components/Navbar/BottomNavbar";

interface LayoutProps {
  children: ReactNode;
}

/**
 * A layout component that wraps its children with a navbar on the left side.
 * It is used to provide a consistent layout structure across different pages.
 * @component
 * @param {LayoutProps} props - The props for the layout component.
 * @param {ReactNode} props.children - The content to be displayed inside the layout.
 * @returns {JSX.Element} The rendered layout component.
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row h-full relative">
      <div
        className="w-full md:w-2/12 hidden md:block h-full p-0 shadow-sm"
        style={{ width: "15dvw" }}
      >
        <Navbar />
      </div>
      <div className="flex-1 p-0 overflow-y-auto">{children}</div>
      <div className="flex-shrink-0">
        <BottomNavbar />
      </div>
    </div>
  );
};

export default Layout;
