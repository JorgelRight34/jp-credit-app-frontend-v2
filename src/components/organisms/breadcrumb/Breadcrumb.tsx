import { Breadcrumbs } from "@mui/material";
import { BreadcrumbSpec } from "@/models/breadcrumbSpec";
import Bread from "./Bread";
import { useEffect, useRef } from "react";
import { useRouter } from "@/hooks/useRouter";

type BreadcrumbProps = React.HTMLAttributes<HTMLDivElement> & {
  breadcrumbs?: BreadcrumbSpec[];
  maxItems?: number;
};

const Breadcrumb = ({
  breadcrumbs,
  maxItems = 4,
  ...props
}: BreadcrumbProps) => {
  return null;
};

export default Breadcrumb;
