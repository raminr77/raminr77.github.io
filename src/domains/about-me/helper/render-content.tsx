import React, { type ReactNode } from 'react';
import Image from 'next/image';
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
        className={content.className}
      />
    );
  }

  if (content.type === ABOUT_ME_CONTENT_TYPE.list) {
    return (
      <>
        <h5>{content.title}</h5>
        <ul>
          {content.data.map((listItemContent: string, listItemIndex: number) => (
            <li key={listItemIndex}>{listItemContent}</li>
          ))}
        </ul>
      </>
    );
  }

  return <div />;
};
