import Image from 'next/image';

import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';
import type { LensItem } from '@/data';

interface LensCardProps {
  data: LensItem;
  animationDelay?: number;
  disabledAnimation?: boolean;
}

export function LensCard({
  data,
  animationDelay = 1,
  disabledAnimation = false
}: LensCardProps) {
  return (
    <div
      className={clsx(
        'cursor-pointer group flex flex-col bg-transparent shadow backdrop-blur-sm duration-500 hover:bg-slate-300/10 justify-between border border-slate-300/40 overflow-hidden',
        !disabledAnimation && animator({ name: 'fadeIn' })
      )}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <Image
        width={830}
        height={830}
        quality={75}
        src={data.src}
        draggable={false}
        fetchPriority="high"
        alt={data.alt || data.title}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="group-hover:scale-120 duration-300"
      />

      <div className="min-h-[200px] p-4 group-hover:pb-8 duration-300 flex flex-col justify-end gap-2 absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent text-white z-10">
        <h3 className="font-bold text-xl">{data.title}</h3>
        <p className="text-md text-center">{data.description.substring(0, 80)}...</p>
      </div>
    </div>
  );
}
