declare module 'highlightjs-copy' {
  interface CopyButtonPluginOptions {
    /** Called after a successful copy. */
    callback?: (text: string, element: HTMLElement) => void;
    /** Hook to transform the text before it is copied to the clipboard. */
    hook?: (text: string, element: HTMLElement) => string | undefined;
    /** UI language code; defaults to the document's `lang` attribute. */
    lang?: string;
    /** Hide the copy button until the user hovers the block. Default: true. */
    autohide?: boolean;
  }

  class CopyButtonPlugin {
    constructor(options?: CopyButtonPluginOptions);
  }

  export default CopyButtonPlugin;
}

declare module 'highlight.js/styles/*.css';
declare module 'highlightjs-copy/dist/*.css';
