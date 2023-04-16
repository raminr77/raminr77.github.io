import classNames from 'classnames';

interface Props extends GCommonCompnentProperties {
  data: {
    id: number;
  };
}

export function ExperienceItem({ data, className }: Props) {
  const {} = data || {};
  return (
    <div className={classNames('', className)}>
      <div>experience</div>
    </div>
  );
}
