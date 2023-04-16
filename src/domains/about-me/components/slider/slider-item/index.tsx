import classNames from 'classnames';
import { Image } from '@/shared/components/Image';

interface Props extends GCommonCompnentProperties {
  slide: Record<string, any>;
}
export function SliderItem({ slide, className }: Props) {
  const { image, title } = slide || {};
  return (
    <div
      style={{ height: 480 }}
      className={classNames(
        'flex items-center duration-500 justify-center overflow-hidden grayscale hover:grayscale-0',
        className
      )}
    >
      <Image src={image} alt={title} />
    </div>
  );
}
