import { Route } from "@/models/route";
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
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (breadcrumbRef.current) {
      breadcrumbRef.current.scrollLeft = breadcrumbRef.current.scrollWidth;
    }
  }, []);

  return (
    <div role="presentation" {...props}>
      <Breadcrumbs
        aria-label="breadcrumb"
        maxItems={maxItems}
        ref={breadcrumbRef}
        {...props}
      >
        {router.matches.map((match, index) => {
          // Assert that handle has our expected type
          const handle = match.handle as Route["handle"];
          const breadcrumb = handle.breadcrumb as Route["breadcrumb"];

          // Get breadcrumb text (if function, call it with params)
          const isBreadcrumbAString = typeof breadcrumb === "string";
          const breadcrumbText = isBreadcrumbAString
            ? breadcrumb
            : breadcrumb?.title;

          // Get icon, if its a string then no icon and if its an object get the icon
          const icon = isBreadcrumbAString ? undefined : breadcrumb?.icon;
          const isLast = index === router.matches.length - 1;

          // Prevent undefined breadcrumbs
          if (!breadcrumbText && !isBreadcrumbAString && !breadcrumb?.loader)
            return null;

          return (
            <Bread
              key={index}
              breadcrumb={
                isBreadcrumbAString || breadcrumb === undefined
                  ? { title: breadcrumbText, icon }
                  : breadcrumb
              }
              params={match.params}
              isLast={isLast}
              pathname={match.pathname}
              onClick={() => router.push(match.pathname)}
            />
          );
        })}
        {breadcrumbs?.map((bread, index) => {
          return (
            <Bread
              key={index}
              breadcrumb={bread}
              isLast={index === breadcrumbs.length - 1}
              pathname={bread.pathname}
              onClick={() =>
                bread.pathname ? router.push(bread.pathname) : undefined
              }
            />
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
