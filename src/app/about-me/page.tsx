import type { Metadata } from 'next';
import { PERSONAL_DATA } from '@/data';
import { AboutMePage } from '@/domains/about-me';

export const metadata: Metadata = {
  title: {
    absolute: `About ${PERSONAL_DATA.fullName}`
  }
};
export default AboutMePage;
