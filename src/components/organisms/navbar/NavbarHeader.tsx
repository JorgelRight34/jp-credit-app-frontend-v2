import { Link } from "react-router";

interface NavbarHeaderProps {
  img: string;
  className?: string;
}

const NavbarHeader = ({ img, className = "" }: NavbarHeaderProps) => {
  return (
    <Link to={"/"}>
      <div className={`p-3 ${className}`}>
        <img className="img-fluid brand" src={img} />
      </div>
    </Link>
  );
};

export default NavbarHeader;
