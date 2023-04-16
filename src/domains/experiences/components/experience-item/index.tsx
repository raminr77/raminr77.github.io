import classNames from 'classnames';

interface Props extends GCommonCompnentProperties {
  data: {
    id: number;
  };
}

export function ExperienceItem({ data, className }: Props) {
  const {} = data || {};
  return (
    <div
      className={classNames(
        'w-full flex flex-col items-center justify-center leading-8 pt-10',
        className
      )}
    >
      <div>This part is under development and not ready yet.</div>
      <div>We hope to be ready very soon</div>
      <div>Please refer to this page later</div>
      <div>Thanks a lot Ramin</div>
    </div>
  );
}
