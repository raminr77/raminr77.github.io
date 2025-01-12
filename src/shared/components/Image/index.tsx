interface Props extends GCommonCompnentProperties {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

export function Image({ src, width, height, alt = '', className }: Props) {
  return (
    <img
      alt={alt}
      src={src}
      loading='lazy'
      width={width}
      height={height}
      className={className}
    />
  );
}
