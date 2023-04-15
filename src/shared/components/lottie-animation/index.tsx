import Lottie from 'react-lottie';
import classNames from 'classnames';

interface Props extends GCommonCompnentProperties {
  data: any;
  loop?: boolean;
  width?: number;
  height?: number;
  autoplay?: boolean;
  clickable?: boolean;
}

export function LottieAnimation({
  data,
  className,
  loop = true,
  width = 300,
  height = 300,
  autoplay = true,
  clickable = true
}: Props) {
  const defaultOptions = {
    loop,
    autoplay,
    animationData: data
  };
  return (
    <div
      className={classNames(className, {
        'pointer-events-none': !clickable
      })}
    >
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
}
