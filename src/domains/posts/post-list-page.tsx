import type { Metadata } from 'next';
import { PERSONAL_DATA } from '@/data';
import { ContentContainer } from '@/layout/components/content-container';

export const metadata: Metadata = {
  title: `${PERSONAL_DATA.fullName} | Posts`
};

export function PostListPage() {
  return (
    <ContentContainer>
      <h1 className='text-center'>Coming Soon...</h1>
    </ContentContainer>
  );
}
