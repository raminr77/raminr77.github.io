import React, { type ReactNode } from 'react';

import Image from 'next/image';

import { clsx } from 'clsx';

import { ABOUT_ME_CONTENT_TYPE, type AboutMeContentItem } from '@/data';
import { Tooltip } from '@/shared/components/tooltip';

export const renderContent = (index: number, content: AboutMeContentItem): ReactNode => {
  if (content.type === ABOUT_ME_CONTENT_TYPE.text) {
    return (
      <p
        key={`render-content-text-${index}`}
        dangerouslySetInnerHTML={{ __html: content.data }}
      />
    );
  }
  if (content.type === ABOUT_ME_CONTENT_TYPE.image) {
    return (
      <Tooltip key={`render-content-tooltip-${index}`} text={content.tooltip}>
        <Image
          key={index}
          draggable={false}
          src={content.url}
          alt={content.title}
          title={content.title}
          width={content.width}
          height={content.height}
          className={clsx('my-2', content.className)}
        />
      </Tooltip>
    );
  }

  if (content.type === ABOUT_ME_CONTENT_TYPE.list) {
    return (
      <div key={`render-content-list-${index}`}>
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

  return <div key={`render-content-none-${index}`} />;
};
