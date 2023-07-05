import Link from 'next/link';
import classNames from 'classnames';
import { CRO_DATA } from '@/shared/constants/cro';
import { ProjectImageSlider } from '../project-image-slider';

interface Props extends GCommonCompnentProperties {
  data: {
    id: number;
    role: string;
    title: string;
    stack: string[];
    repoUrl?: string;
    demoUrl?: string;
    images?: string[];
    description: string;
    isOpenSource?: boolean;
  };
}

export function ProjectItem({ data, className }: Props) {
  const { title, description, role, stack, images, isOpenSource, repoUrl, demoUrl } =
    data || {};
  return (
    <div
      className={classNames(
        'flex flex-col justify-between text-sm leading-8 border border-solid border-white p-4 overflow-hidden',
        className
      )}
    >
      <div className='flex flex-col'>
        {images && images?.length > 0 && <ProjectImageSlider data={images} />}

        <h1
          className={classNames('text-xl font-title', {
            'mt-4': images && images?.length > 0
          })}
        >
          {title}
        </h1>

        <h4>{role}</h4>

        {isOpenSource && (
          <div className='text-green-500 flex items-center gap-x-2 border-l-2 border-solid border-green-500 pl-2'>
            Open Source
          </div>
        )}

        {demoUrl && (
          <Link
            href={demoUrl}
            target='_blank'
            data-cro-id={CRO_DATA.CLICK_PROJECT_ITEM_DEMO_LINK}
            className='text-sky-400 border-l-2 border-solid border-sky-400 pl-2'
          >
            Show Demo Or Project
          </Link>
        )}

        {repoUrl && (
          <Link
            href={repoUrl}
            target='_blank'
            data-cro-id={CRO_DATA.CLICK_PROJECT_ITEM_CODE_LINK}
            className='text-sky-400 border-l-2 border-solid border-sky-400 pl-2'
          >
            Show Code Or Repository
          </Link>
        )}

        <p className='text-sm leading-6 mt-2'>{description}</p>
      </div>

      <div className='flex flex-wrap gap-2 mt-4'>
        {stack.map((item) => (
          <div
            key={item}
            className='text-sm px-2 leading-6 border border-solid border-white'
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
