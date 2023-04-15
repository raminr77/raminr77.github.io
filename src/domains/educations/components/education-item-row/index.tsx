import classNames from 'classnames';

interface Props extends GCommonCompnentProperties {
  data: { date: string; title: string; location: string; description: string };
}

export function EducationItemRow({ data, className }: Props) {
  const { date, title, location, description } = data || {};
  return (
    <div
      className={classNames(
        'flex justify-between bg-slate-900 border-l-4 border-solid border-white p-4 mb-4 items-center',
        className
      )}
    >
      <div className='flex flex-col'>
        <h3 className='text-xl mb-2'>{title}</h3>
        <div className='text-md'>- {description}</div>
      </div>
      <div className='flex flex-col'>
        <div className='text-sm mb-2'>{location}</div>
        <div>{date}</div>
      </div>
    </div>
  );
}
