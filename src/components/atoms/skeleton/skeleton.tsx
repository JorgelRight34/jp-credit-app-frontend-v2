import clsx from "clsx";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton = ({ className, children }: SkeletonProps) => {
  return (
    <div className={clsx("animate-pulse rounded-md bg-gray-200", className)}>
      {children}
    </div>
  );
};

export default Skeleton;
