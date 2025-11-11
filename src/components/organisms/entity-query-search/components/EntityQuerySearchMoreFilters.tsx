import { QuerySearchInput } from "@/models";
import { Query } from "@/models/query";
import clsx from "clsx";
import { FormFieldInput } from "@/components/EntityForm";
import { FormLabel } from "@/components/ui";
import { useMemo } from "react";

interface EntityQuerySearchMoreFiltersProps<T extends Query>
  extends React.HTMLAttributes<HTMLDivElement> {
  fields: QuerySearchInput<T>[];
  columns: number;
}

const rowWidth = 12;

const EntityQuerySearchMoreFilters = <T extends Query>({
  fields,
  columns = 2,
  className,
  ...props
}: EntityQuerySearchMoreFiltersProps<T>) => {
  const columnWidth = useMemo(() => {
    return Math.ceil(
      rowWidth / (fields.length > columns ? columns : fields.length),
    );
  }, [fields.length, columns]);

  return (
    <div className={clsx("flex w-full flex-wrap space-y-3", className)}>
      {fields.map((field, index) => (
        <div
          className={clsx(`w-full px-2 md:w-${columnWidth}/${rowWidth}`)}
          key={index}
        >
          <FormLabel>{field.label}</FormLabel>
          <FormFieldInput
            formField={field}
            key={index}
            {...props}
            hideLabel={true}
            className="!w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default EntityQuerySearchMoreFilters;
