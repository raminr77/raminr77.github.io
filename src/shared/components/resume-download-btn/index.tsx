import Link from 'next/link';
import classNames from 'classnames';
import { RESUME_FILE_DATA } from '@/data/resume-file';
import { GA_EVENT_NAMES } from '@/shared/constants/ga';
import { gaEvent } from '@/shared/services/ga';
import styles from './resume-download-btn.module.scss';

export function ResumeDownloadBtn() {
  return (
    <Link
      onClick={() =>
        gaEvent({ action: GA_EVENT_NAMES.RESUME_DOWNLOAD, params: { file: 'resume' } })
      }
      download={RESUME_FILE_DATA.NAME}
      href={RESUME_FILE_DATA.URL}
      className='inline-block'
      target='_blank'
    >
      <div
        className={classNames(
          'w-52 h-12 overflow-hidden duration-300 relative flex items-center justify-center',
          styles.ResumeDownloadBtn__content
        )}
      >
        <span className='absolute w-full top-0 right-0' />
        <span className='absolute h-full right-0 bottom-0' />
        <span className='absolute h-full top-0 left-0' />
        <span className='absolute w-full bottom-0 left-0' />
        {RESUME_FILE_DATA.ACTION_TEXT}
      </div>
    </Link>
  );
}
