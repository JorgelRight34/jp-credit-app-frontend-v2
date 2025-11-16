import NextImage, { ImageProps as NextImageProps } from "next/image";
import clsx from "clsx";

export type ImageProps = NextImageProps & {
  imgClassName?: string;
  aspect?: string;
};

const Image = ({
  width,
  aspect = "video",
  height,
  imgClassName,
  className,
  style,
  ...props
}: ImageProps) => {
  return (
    <div
      className={clsx(
        `relative flex aspect-${aspect} h-auto w-full items-center justify-center`,
        className,
      )}
      style={style}
    >
      <NextImage
        placeholder="blur"
        className={imgClassName}
        width={width}
        height={height}
        fill={height || width ? false : true}
        {...props}
      />
    </div>
  );
};

export default Image;
