'use client';

import { notify } from '@/shared/helpers';
import { useEffect } from 'react';

import CopyButtonPlugin from '../../../../public/highlight-copy.min.js';

import '../../../../public/highlight-copy.min.css';
import '../../../../public/highlight.min.css';

import './client-code-loader.scss';

export function ClientCodeLoader() {
  useEffect(() => {
    const codeContainers = document.querySelectorAll('pre');

    const handleChangeCodePreview = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const parentElement = target.parentElement;

      if (!parentElement) return;

      if (!parentElement.classList.contains('max-h-100')) {
        parentElement.classList.remove('expand-button-overlay--collapsed');
        parentElement.classList.add('max-h-100');
        target.innerHTML = 'Expand Code';
        window.scrollTo({
          top: parentElement.offsetTop - 200,
          behavior: 'smooth'
        });
      } else {
        parentElement.classList.add('expand-button-overlay--collapsed');
        parentElement.classList.remove('max-h-100');
        target.innerHTML = 'Collapse Code';
      }
    };

    codeContainers.forEach((container) => {
      const containerElement = container as HTMLElement;

      const isSmallCodeBlock = containerElement.offsetHeight < 300;
      if (isSmallCodeBlock) return;

      containerElement.classList.add('max-h-100', 'expand-button-overlay');

      const expandButton = document.createElement('button');
      expandButton.className = 'handle-change-code-preview-button';
      expandButton.innerHTML = 'Expand Code';

      expandButton.addEventListener('click', handleChangeCodePreview);

      containerElement.append(expandButton);
    });

    import('../../../../public/highlight.min.js')
      .then(
        (hljs: { addPlugin: (plugin: unknown) => void; highlightAll: () => void }) => {
          hljs.addPlugin(
            new CopyButtonPlugin({
              autohide: false,
              callback: () => notify.success({ message: 'Copied to clipboard.' })
            })
          );
          hljs.highlightAll();
        }
      )
      .catch(() => {
        console.error('Failed to load highlight.js');
      });
  }, []);

  return null;
}
