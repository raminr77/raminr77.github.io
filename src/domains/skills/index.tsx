import classNames from 'classnames';
import { PageContainer } from '@/app/layout/page-container';
import { MAIN_DATA } from '@/data';
import { SkillItemRow } from '@/domains/skills/components/skill-item-row';
import { animator } from '@/shared/utils/animator';

export function SkillsPage() {
  const { BACK_END, FRONT_END, GRAPHICS, SOFT, LEARNING } = MAIN_DATA.SKILLS;
  const titleClasses = classNames(
    'font-title mb-4 mt-6 border-l-2 border-solid border-white p-3',
    animator({ name: 'fadeIn', delay: '1s' })
  );

  return (
    <PageContainer title='Skills' className='select-none' animationName='fadeInUp'>
      <h3 className='font-title-bold text-2xl mb-4'>Skills</h3>

      <h4 className={titleClasses}>Back-end Skills</h4>
      {BACK_END.map((item) => (
        <SkillItemRow key={item.id} data={item} />
      ))}

      <h4 className={titleClasses}>Front-end Skills</h4>
      {FRONT_END.map((item) => (
        <SkillItemRow key={item.id} data={item} />
      ))}

      <h4 className={titleClasses}>Graphic Skills</h4>
      {GRAPHICS.map((item) => (
        <SkillItemRow key={item.id} data={item} />
      ))}

      <h4 className={titleClasses}>Soft Skills</h4>
      {SOFT.map((item) => (
        <SkillItemRow key={item.id} data={item} />
      ))}

      <h4
        className={classNames(
          'text-sky-400 font-title mb-4 mt-10',
          animator({ name: 'fadeIn', delay: '1s' })
        )}
      >
        Learning Now ...
      </h4>
      {LEARNING.map((item) => (
        <SkillItemRow isLearning key={item.id} data={item} />
      ))}
    </PageContainer>
  );
}
