import { BottomNavbar, Navbar } from "@/components";
import { ReactNode } from "react";

interface LayoutProps {
  children: Readonly<ReactNode>;
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
    <div className="relative flex h-full flex-col md:flex-row">
      <div
        className="hidden h-full w-full p-0 shadow-sm md:block md:w-2/12"
        style={{ width: "15dvw" }}
      >
        <Navbar />
      </div>
      <div className="flex-1 overflow-y-auto p-0">{children}</div>
      <div className="flex-shrink-0">
        <BottomNavbar />
      </div>
    </div>
  );
};

export default Layout;
