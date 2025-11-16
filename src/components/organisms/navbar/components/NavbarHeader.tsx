import { Image, Link } from "@/components/atoms";
import { ImageProps } from "@/components/atoms";
import clsx from "clsx";

interface NavbarHeaderProps extends ImageProps {
  className?: string;
}

const NavbarHeader = ({ className = "", alt, ...props }: NavbarHeaderProps) => {
  return (
    <Link href="/">
      <div className={clsx("p-3", className)}>
        <Image className="img-fluid brand" alt={alt} {...props} />
      </div>
    </Link>
  );
};

export default NavbarHeader;
