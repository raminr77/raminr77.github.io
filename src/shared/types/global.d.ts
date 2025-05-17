export type PixelCanvasProps = {
  className?: string;
  'data-gap'?: number;
  'data-speed'?: number;
  'data-colors'?: string;
  'data-play-ones'?: boolean;
  'data-auto-play'?: boolean;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pixel-canvas': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        PixelCanvasProps;
    }
  }
}

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'pixel-canvas': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        PixelCanvasProps;
    }
  }
}
