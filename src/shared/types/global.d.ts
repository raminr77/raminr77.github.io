export type PixelCanvasProps = {
  className?: string;
  'data-gap'?: number;
  'data-speed'?: number;
  'data-colors'?: string;
  'data-play-ones'?: boolean;
  'data-auto-play'?: boolean;
};

declare global {
  module '*.css';
  module '*.scss';
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
