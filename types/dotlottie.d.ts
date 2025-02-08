declare namespace JSX {
  interface IntrinsicElements {
    'dotlottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src: string;
      autoplay?: boolean;
      loop?: boolean;
      mode?: string;
      style?: React.CSSProperties;
      id?: string;
    }
  }
}