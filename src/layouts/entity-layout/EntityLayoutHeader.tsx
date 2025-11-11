import clsx from "clsx";
import EntityLayoutTopOptions, {
  EntityLayoutTopOptionsProps,
} from "./EntityLayoutTopOptions";
import { useRouter } from "@/hooks/useRouter";

export type EntityLayoutHeaderProps = React.HTMLAttributes<HTMLDivElement> &
  EntityLayoutTopOptionsProps & {
    title: string;
    showTopOptions?: boolean;
    create?: boolean;
    edit?: boolean;
  };

const EntityLayoutHeader = ({
  title,
  className,
  create,
  edit,
  onCreate,
  onEdit,
  ...props
}: EntityLayoutHeaderProps) => {
  const router = useRouter();

  const handleCreate =
    onCreate ?? (create ? () => router.push("create") : undefined);

  const handleEdit = onEdit ?? (edit ? () => router.push("edit") : undefined);

  return (
    <div
      className={clsx(
        "pt-lg-0 pb-lg-2 px-lg-3 flex w-full flex-shrink-0 items-center justify-between pb-2",
        className,
      )}
    >
      {/* Title */}
      <h3 className="border-left-accent mb-0 truncate pl-2">{title}</h3>
      <EntityLayoutTopOptions
        onCreate={handleCreate}
        onEdit={handleEdit}
        {...props}
      />
    </div>
  );
};

export default EntityLayoutHeader;
