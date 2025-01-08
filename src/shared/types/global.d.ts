declare namespace JSX {
  interface IntrinsicElements {
    'pixel-canvas': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      className?: string;
      'data-gap'?: number;
      'data-speed'?: number;
      'data-colors'?: string;
    };
  }
}
