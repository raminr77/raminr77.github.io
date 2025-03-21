import React, { type ReactNode } from 'react';

import Image from 'next/image';

import { clsx } from 'clsx';

import { ABOUT_ME_CONTENT_TYPE, type AboutMeContentItem } from '@/data';

export const renderContent = (index: number, content: AboutMeContentItem): ReactNode => {
  if (content.type === ABOUT_ME_CONTENT_TYPE.text) {
    return <p key={index} dangerouslySetInnerHTML={{ __html: content.data }} />;
  }
  if (content.type === ABOUT_ME_CONTENT_TYPE.image) {
    return (
      <Image
        key={index}
        draggable={false}
        src={content.url}
        alt={content.title}
        title={content.title}
        width={content.width}
        height={content.height}
        className={clsx('my-4', content.className)}
      />
    );
  }

  if (content.type === ABOUT_ME_CONTENT_TYPE.list) {
    return (
      <div key={index}>
        <p>{content.title}</p>
        <ul className="ml-5 mt-2">
          {content.data.map((listItemContent: string, listItemIndex: number) => (
            <li
              key={listItemIndex}
              dangerouslySetInnerHTML={{ __html: listItemContent }}
            />
          ))}
        </ul>
      </div>
    );
  }

  return <div />;
};
