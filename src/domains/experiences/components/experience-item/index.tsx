import classNames from 'classnames';
import { SkillItemRow } from '@/domains/skills/components/skill-item-row';

interface Props extends GCommonCompnentProperties {
  data: {
    id: number;
    date: string;
    role: string;
    title: string;
    skills: string[];
    achievement: string[];
  };
}

export function ExperienceItem({ data, className }: Props) {
  const { title, role, date, achievement, skills } = data || {};
  return (
    <div
      className={classNames(
        'w-full flex flex-col leading-8 border border-solid border-white p-5 mb-4',
        className
      )}
    >
      <h1 className='text-4xl font-bold'>{title}</h1>

      <div className='flex items-center justify-between my-3'>
        <h3 className='text-xl'>{role}</h3>
        <h3 className='text-sm'>{date}</h3>
      </div>

      <ul className='text-sm leading-8 mt-3 list-disc ml-4'>
        {achievement.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className='mt-3'>
        {skills.map((item) => (
          <SkillItemRow key={item} data={{ title: item }} />
        ))}
      </div>
    </div>
  );
}
