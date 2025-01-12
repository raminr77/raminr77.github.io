import classNames from 'classnames';

interface Props extends GCommonCompnentProperties {
  data: {
    date: string;
    title: string;
    location: string;
    description: string;
    achievement: string[];
  };
}

export function EducationItemRow({ data, className }: Props) {
  const { date, title, location, description, achievement } = data || {};
  return (
    <div
      className={classNames(
        'flex flex-col border-l-8 border border-solid border-white p-4 mb-4',
        className
      )}
    >
      <div className='flex lg:flex-row flex-col justify-between'>
        <div className='flex flex-col'>
          <h3 className='text-xl mb-2'>{title}</h3>
          <div className='text-md'>{description}</div>
        </div>
        <div className='flex flex-col mt-7 lg:mt-0'>
          <div className='text-sm mb-2'>{location}</div>
          <div>{date}</div>
        </div>
      </div>
      {achievement && (
        <ul className='w-full mt-4'>
          {achievement.map((text, index) => (
            <li key={index} className='list-disc ml-5 mb-1'>
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
