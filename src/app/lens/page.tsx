import { LensPage, metadata } from '@/domains/lens';

export { metadata };

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default function Page({ searchParams }: Props) {
  return <LensPage searchParams={searchParams} />;
}
