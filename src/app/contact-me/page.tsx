import type { Metadata } from 'next';
import { PERSONAL_DATA } from '@/data';
import { ContactMePage } from '@/domains/contact-me';

export const metadata: Metadata = {
  title: {
    absolute: `Contact With ${PERSONAL_DATA.fullName}`
  }
};
export default ContactMePage;
