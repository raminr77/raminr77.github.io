import classNames from 'classnames';

interface Props extends GCommonCompnentProperties {
  data: {};
}

export function ExperienceItem({ data, className }: Props) {
  return (
    <div className={classNames('', className)}>
      <div>experience</div>
    </div>
  );
}
