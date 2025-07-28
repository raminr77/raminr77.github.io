import {
  RECOMMENDATION_PAGE_DATA,
  RECOMMENDATIONS,
  type RecommendationItem
} from '@/data';
import { ROUTES } from '@/shared/constants';
import Image from 'next/image';
import Link from 'next/link';

export function RecommendationsBox() {
  return (
    <div className="w-full flex flex-col mt-5 items-center">
      <p
        className="w-full mb-4"
        dangerouslySetInnerHTML={{ __html: RECOMMENDATION_PAGE_DATA.aboutMeDescription }}
      />

      <div className="max-h-[210px] w-full flex flex-wrap items-center justify-center gap-2 overflow-hidden">
        {RECOMMENDATIONS.slice(0, 17).map(
          ({ id, fullName, imageURL }: RecommendationItem) =>
            imageURL && (
              <Link key={id} href={ROUTES.RECOMMENDATIONS}>
                <Image
                  width={100}
                  height={100}
                  alt={fullName}
                  src={imageURL}
                  loading="lazy"
                  className="grayscale rounded-md w-[100px] h-[100px]"
                />
              </Link>
            )
        )}
      </div>

      <Link
        href={ROUTES.RECOMMENDATIONS}
        className="border-b border-orange-500 px-5 pb-1 duration-200 hover:px-8 my-5"
      >
        See all recommendations
      </Link>
    </div>
  );
}
