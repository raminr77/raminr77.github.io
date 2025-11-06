import { lazy, Suspense } from 'react';

// ICONS - https://icones.js.org/collection/lucide
const ICONS = {
  sun: lazy(() => import('./sun').then((module) => ({ default: module.Sun }))),
  moon: lazy(() => import('./moon').then((module) => ({ default: module.Moon }))),
  time: lazy(() => import('./time').then((module) => ({ default: module.Time }))),
  date: lazy(() => import('./date').then((module) => ({ default: module.Date }))),
  close: lazy(() => import('./close').then((module) => ({ default: module.Close }))),
  share: lazy(() => import('./share').then((module) => ({ default: module.Share }))),
  search: lazy(() => import('./search').then((module) => ({ default: module.Search }))),
  author: lazy(() => import('./author').then((module) => ({ default: module.Author }))),
  category: lazy(() =>
    import('./category').then((module) => ({ default: module.Category }))
  )
} as const;

type IconsProps = {
  size?: number;
  name: keyof typeof ICONS;
} & React.HTMLAttributes<SVGElement>;

export function Icons({ name, size = 18, ...props }: IconsProps) {
  const IconComponent = ICONS[name];
  if (!IconComponent) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Suspense fallback={<g />}>
        <IconComponent />
      </Suspense>
    </svg>
  );
}
