import type { Metadata } from 'next';

import { AboutMePage } from '@/domains/about-me';
import { PERSONAL_DATA } from '@/data';

export const metadata: Metadata = {
  title: {
    absolute: `About ${PERSONAL_DATA.fullName}`
  }
};
export default AboutMePage;
