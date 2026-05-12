'use client';

import { useEffect } from 'react';

import { notify } from '@/shared/helpers';

import 'highlightjs-copy/dist/highlightjs-copy.min.css';
import 'highlight.js/styles/github-dark.css';
import './client-code-loader.scss';

/**
 * Loads highlight.js and the copy-button plugin on the client, then highlights
 * every `<code>` block on the page. Expand / collapse behaviour for long blocks
 * is owned by the `<CodeBlock>` component (wired into markdown-to-jsx as a `pre`
 * override), so this loader only handles syntax highlighting + copy buttons.
 */
export function ClientCodeLoader() {
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const [{ default: hljs }, copyModule] = await Promise.all([
          import('highlight.js'),
          import('highlightjs-copy')
        ]);

        if (cancelled) return;

        const CopyButtonPlugin = copyModule.default;

        hljs.addPlugin(
          new CopyButtonPlugin({
            autohide: false,
            callback: () => notify.success({ message: 'Copied to clipboard.' })
          })
        );

        hljs.highlightAll();
      } catch (error) {
        // Highlighting is enhancement-only — the page still works without it.
        notify.error({
          message: error instanceof Error ? error.message : 'Failed to load highlight.js'
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
