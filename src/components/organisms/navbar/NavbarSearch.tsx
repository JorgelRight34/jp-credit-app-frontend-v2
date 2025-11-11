import { useEffect, useMemo, useState, useTransition } from "react";
import "./_navbar.css";
import Input from "../EntityForm/inputs/Input";
import { NavbarLink } from "./navbarLink";

interface NavbarSearchProps {
  options: NavbarLink[];
  className?: string;
  onSearch?: (results: NavbarLink[]) => void;
}

const NavbarSearch = ({
  options,
  onSearch,
  className = "",
}: NavbarSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const [, startTransition] = useTransition();

  const allOptions = useMemo<NavbarLink[]>(() => {
    return options.flatMap((option) => [...(option.children ?? []), option]);
  }, [options]);

  const filteredOptions = useMemo<NavbarLink[]>(() => {
    if (inputValue == "") return options;
    const result = allOptions.filter(
      (option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        inputValue.toLowerCase().includes(option.name)
    );
    return result;
  }, [inputValue, options, allOptions]);

  useEffect(() => {
    onSearch?.(filteredOptions);
  }, [filteredOptions, onSearch]);

  return (
    <Input
      icon={{ icon: "search", iconDirection: "left" }}
      className={className}
      placeholder="Buscar..."
      value={inputValue}
      onChange={(v) => startTransition(() => setInputValue(v))}
    />
  );
};

export default NavbarSearch;
