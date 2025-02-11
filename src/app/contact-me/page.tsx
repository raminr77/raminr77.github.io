import type { Metadata } from 'next';

import { ContactMePage } from '@/domains/contact-me';
import { PERSONAL_DATA } from '@/data';

export const metadata: Metadata = {
  title: {
    absolute: `Contact With ${PERSONAL_DATA.fullName}`
  }
};
export default ContactMePage;
