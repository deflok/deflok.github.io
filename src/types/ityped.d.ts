declare module 'ityped' {
  export interface ItypedOptions {
    strings?: string[];
    typeSpeed?: number;
    backSpeed?: number;
    backDelay?: number;
    startDelay?: number;
    loop?: boolean;
    showCursor?: boolean;
    cursorChar?: string;
    onFinished?: () => void;
  }
  
  export function init(element: HTMLElement, options: ItypedOptions): void;
}