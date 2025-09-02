import Image from 'next/image';

// ICONS
type IconName = 'author' | 'category' | 'close' | 'date' | 'new-tab' | 'search' | 'time';

interface IconProps {
  alt: string;
  size?: number;
  name: IconName;
  className?: string;
}

export function Icon({ name, alt, size = 20, className }: IconProps) {
  return (
    <Image
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      src={`/images/svgs/${name}-icon.svg`}
      className={`dark:invert ${className}`}
    />
  );
}
