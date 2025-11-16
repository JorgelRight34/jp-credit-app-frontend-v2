import { useEffect, useMemo, useState, useTransition } from "react";
import "./_navbar.css";
import { NavItem } from "../models/navItem";
import { Input } from "@/components/atoms";

interface NavbarSearchProps {
  options: NavItem[];
  className?: string;
  onSearch?: (results: NavItem[]) => void;
}

const NavbarSearch = ({
  options,
  className = "",
  onSearch,
}: NavbarSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const [, startTransition] = useTransition();

  const allOptions = useMemo<NavItem[]>(
    () => options.flatMap((option) => [...(option.children ?? []), option]),
    [options],
  );

  const filteredOptions = useMemo<NavItem[]>(() => {
    if (inputValue == "") return options;

    return allOptions.filter(
      (option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        inputValue.toLowerCase().includes(option.name),
    );
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
