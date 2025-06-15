/**
 * Type definitions for the lazy-img web component
 */

/**
 * HTML element interface for lazy-img
 */
interface HTMLLazyImgElement extends HTMLElement {
  /**
   * The URL of the image to be lazy-loaded
   */
  src: string;

  /**
   * The URL of the placeholder image to show before loading
   */
  placeholderSrc: string;

  /**
   * Visual effect to apply during loading ('blur', 'opacity', 'black-and-white')
   */
  effect: string;

  /**
   * Distance in pixels from the viewport when the image should start loading
   */
  threshold: number;

  /**
   * Whether to use IntersectionObserver API (modern browsers)
   */
  useIntersectionObserver: boolean;

  /**
   * Whether the image should be visible without lazy loading
   */
  visibleByDefault: boolean;

  /**
   * Method to use for scroll/resize event handling ('debounce' or 'throttle')
   */
  delayMethod: 'debounce' | 'throttle';

  /**
   * Time in ms for throttling/debouncing events
   */
  delayTime: number;

  /**
   * Width of the image in pixels
   */
  width: number;

  /**
   * Height of the image in pixels
   */
  height: number;

  /**
   * Additional inline styles for the image
   */
  imgStyle: string;
}

/**
 * JSX IntrinsicElements interface for React support
 */
declare namespace JSX {
  interface IntrinsicElements {
    /**
     * Custom element for lazy loading images.
     * 
     * @example
     * <lazy-img
     *   src="/image.jpg"
     *   placeholderSrc="/placeholder.jpg"
     *   effect="blur"
     *   threshold={100}
     *   useIntersectionObserver={true}
     * />
     */
    'lazy-img': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLLazyImgElement> & {
        /**
         * The URL of the image to be lazy-loaded
         */
        src?: string;

        /**
         * The URL of the placeholder image to show before loading
         */
        placeholderSrc?: string;

        /**
         * Visual effect to apply during loading ('blur', 'opacity', 'black-and-white')
         */
        effect?: string;

        /**
         * Distance in pixels from the viewport when the image should start loading
         */
        threshold?: number | string;

        /**
         * Whether to use IntersectionObserver API (modern browsers)
         */
        useIntersectionObserver?: boolean;

        /**
         * Whether the image should be visible without lazy loading
         */
        visibleByDefault?: boolean;

        /**
         * Method to use for scroll/resize event handling ('debounce' or 'throttle')
         */
        delayMethod?: 'debounce' | 'throttle';

        /**
         * Time in ms for throttling/debouncing events
         */
        delayTime?: number | string;

        /**
         * Width of the image in pixels
         */
        width?: number | string;

        /**
         * Height of the image in pixels
         */
        height?: number | string;

        /**
         * Additional inline styles for the image
         */
        imgStyle?: string;

        /**
         * Event fired when the image has loaded
         */
        onLoad?: (e: CustomEvent) => void;
      },
      HTMLLazyImgElement
    >;
  }
}

/**
 * Augment HTMLElementTagNameMap to expose the element interface
 */
declare global {
  interface HTMLElementTagNameMap {
    'lazy-img': HTMLLazyImgElement;
  }
}
