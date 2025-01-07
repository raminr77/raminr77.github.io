'use client';
import { clsx } from 'clsx';
import { animator } from '@/shared/helpers';
import { type JourneyItem, JOURNEY_DATA } from '@/data/journey';

interface VerticalTimelineProps {
  className?: string;
}

const LINE_HEIGHT: number = JOURNEY_DATA.length * 260;
export const VerticalTimeline = ({ className }: VerticalTimelineProps) => {
  return (
    <svg
      height={LINE_HEIGHT}
      xmlns='http://www.w3.org/2000/svg'
      className={clsx(className, animator({ name: 'fadeInDown' }))}
    >

      <path
        id="line"
        fill="none"
        strokeWidth="1"
        stroke="var(--foreground)"
        d={`M 100 0 L 100 ${LINE_HEIGHT}`}
      />

      {JOURNEY_DATA.map((item: JourneyItem, index: number) => {
        const position: number = (LINE_HEIGHT / (JOURNEY_DATA.length + 1)) * (index + 1);
        return (
          <g
            key={index}
            className={animator({ name: 'fadeInUp' })}
            style={{ animationDelay: `${(index + 1) * 0.3}s` }}
          >
            <circle
              r='30'
              cx='100'
              cy={position}
              strokeWidth='0'
              fill='var(--foreground)'
            />
            <text x='100' y={position} fontSize='18' textAnchor='middle' dy='6'>
              {item.year}
            </text>
            <line
              x1='130'
              x2='160'
              y1={position}
              y2={position}
              strokeWidth='1'
              stroke='var(--foreground)'
            />
            <text
              dy='5'
              x='170'
              y={position}
              fontSize='23'
              textAnchor='start'
              fill='var(--foreground)'
            >
              {item.title.toUpperCase()}
            </text>
            <text
              dy='30'
              x='170'
              y={position}
              fontSize='16'
              textAnchor='start'
              fill='var(--foreground)'
            >
              {item.description}
            </text>
          </g>
        );
      })}

      <circle cx='100' cy='10' r='10' strokeWidth='0' fill='var(--foreground)' />
      <circle
        cx='100'
        cy={LINE_HEIGHT - 10}
        r='10'
        strokeWidth='0'
        fill='var(--foreground)'
      />
    </svg>
  );
};
