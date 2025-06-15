import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

function debounce(callback: Function, delay: number) {
  let timerId: number;
  return (...args: any) => {
    clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  }
}

function throttle(callback: Function, delay: number) {
  let lastCall = 0;
  let timeoutId: number | null = null;

  return (...args: any) => {
    const now = Date.now();
    const remaining = delay - (now - lastCall);

    if ((now - lastCall) >= delay) {
      lastCall = now;
      callback(...args);
    } else if (!timeoutId) {
      timeoutId = window.setTimeout(() => {
        lastCall = Date.now();
        callback(...args);
        timeoutId = null;
      }, remaining);
    }
  }
}

/**
 * Custom element for lazy loading images.
 * 
 * @element lazy-img
 * 
 * @prop {string} src - The URL of the image to be lazy-loaded
 * @prop {string} placeholderSrc - The URL of the placeholder image to show before loading
 * @prop {string} effect - Visual effect to apply during loading ('blur', 'black-and-white')
 * @prop {number} threshold - Distance in pixels from the viewport when the image should start loading
 * @prop {boolean} useIntersectionObserver - Whether to use IntersectionObserver API (modern browsers)
 * @prop {boolean} visibleByDefault - Whether the image should be visible without lazy loading
 * @prop {string} delayMethod - Method to use for scroll/resize event handling ('debounce' or 'throttle')
 * @prop {number} delayTime - Time in ms for throttling/debouncing events
 * @prop {number} width - Width of the image in pixels
 * @prop {number} height - Height of the image in pixels
 * @prop {string} imgStyle - Additional inline styles for the image
 * 
 * @fires {CustomEvent} load - Fired when the image has loaded, with original event in detail
 * 
 * @example
 * <lazy-img
 *   src="/image.jpg"
 *   placeholderSrc="/placeholder.jpg"
 *   effect="blur"
 *   threshold="100"
 *   useIntersectionObserver
 * ></lazy-img>
 */
@customElement('lazy-img')
export class LazyImg extends LitElement {

  // Element properties
  @property({ type: String }) src = '';
  @property({ type: String }) placeholderSrc = '';
  @property({ type: String }) effect = 'blur';
  @property({ type: Number }) threshold = 0;
  @property({ type: Boolean }) useIntersectionObserver = false;
  @property({ type: Boolean }) visibleByDefault = false;
  @property({ type: String }) delayMethod = 'debounce'; // 'debounce' or 'throttle'
  @property({ type: Number }) delayTime = 0;
  @property({ type: Number }) width = 0;
  @property({ type: Number }) height = 0;
  @property({ type: String }) imgStyle = '';


  // Internal state
  private observer?: IntersectionObserver;
  private scrollAndResizeCallback?: EventListener;
  private imageVisible = false;
  private scrollParent: Window | HTMLElement = window;

  static styles = css`

    .lazy-load-image-background.blur {
      filter: blur(15px);
    }

    .lazy-load-image-background.blur.lazy-load-image-loaded {
      filter: blur(0);
      transition: filter .3s;
    }

    .lazy-load-image-background.blur.lazy-load-image-loaded {
      opacity: 1;
      transition: opacity .3s;
    }

    .lazy-load-image-background.black-and-white {
      filter: grayscale(1);
    }

    .lazy-load-image-background.black-and-white.lazy-load-image-loaded {
      filter: grayscale(0);
      transition: filter .3s;
    }    

    .lazy-load-image-background.black-and-white.lazy-load-image-loaded {
      opacity: 1;
      transition: opacity .3s;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.visibleByDefault) {
      this.imageVisible = true;
    } else if (this.useIntersectionObserver && 'IntersectionObserver' in window) {
      this.initialiseObserver();
    } else {
      this.initScrollAndResizeHandlers();
    }
    this.handleScroll();
  }

  disconnectedCallback() {
    this.observer?.disconnect();
    this.removeScrollAndResizeListeners();
    super.disconnectedCallback();
  }

  firstUpdated() {
    if (this.observer) {
      this.observer.observe(this);
    }
  }

  private removeScrollAndResizeListeners() {
    if (this.scrollAndResizeCallback) {
      this.scrollParent?.removeEventListener('scroll', this.scrollAndResizeCallback);
      window?.removeEventListener('scroll', this.scrollAndResizeCallback);
      window.removeEventListener('resize', this.scrollAndResizeCallback);
      this.scrollAndResizeCallback = undefined;
    }
  }

  /**
   * Finds the nearest scrollable ancestor of the given element.
   * Checks each parent element up the DOM tree for CSS overflow properties
   * set to 'auto' or 'scroll'. If no such ancestor is found, returns the window object.
   * This is useful for determining which element's scroll events should be listened to
   * for lazy loading or infinite scroll functionality.
   *
   * @param element The element whose scroll parent is to be found.
   * @returns The nearest scrollable ancestor element, or window if none found.
  */
  private getScrollParent(element: HTMLElement): HTMLElement | Window {
    let parent: HTMLElement | null = element.parentElement;

    while (parent) {
      const style = getComputedStyle(parent);
      if (/(auto|scroll)/.test(style.overflow + style.overflowY + style.overflowX)) {
        return parent;
      }
      parent = parent.parentElement;
    }

    return window;
  }


  private initScrollAndResizeHandlers() {
    const handle = this.delayMethod === 'debounce' ? debounce : throttle;
    this.scrollAndResizeCallback = handle(() => this.handleScroll(), this.delayTime);
    this.scrollParent = this.getScrollParent(this);

    if (this.scrollParent) {
      this.scrollParent.addEventListener('scroll', this.scrollAndResizeCallback, { passive: true });
    } else {
      window.addEventListener('scroll', this.scrollAndResizeCallback, { passive: true });
    }
    window.addEventListener('resize', this.scrollAndResizeCallback);
  }

  private initialiseObserver() {
    this.observer = new IntersectionObserver(this.onIntersection, {
      rootMargin: `${this.threshold}px`,
    });
  }

  private onIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      this.loadImage();
      this.observer?.disconnect();
    }
  };

  private handleScroll = () => {
    if (this.visibleByDefault || this.imageVisible) {
      return;
    }

    const rect = this.getBoundingClientRect();
    let isCurrentlyVisible = false;

    if (this.scrollParent instanceof HTMLElement) {
      const parentRect = this.scrollParent.getBoundingClientRect();
      const containerTop = parentRect.top;
      const containerBottom = parentRect.bottom;
      const containerLeft = parentRect.left;
      const containerRight = parentRect.right;

      const inVerticalView = rect.bottom >= containerTop && rect.top <= containerBottom;
      const inHorizontalView = rect.right >= containerLeft && rect.left <= containerRight;

      isCurrentlyVisible = inVerticalView && inHorizontalView;
    } else {
      const inVerticalView = rect.bottom >= 0 && rect.top <= window.innerHeight;
      const inHorizontalView = rect.right >= 0 && rect.left <= window.innerWidth;


      isCurrentlyVisible = inVerticalView && inHorizontalView;
    }

    if (isCurrentlyVisible) {
      this.loadImage();
      this.removeScrollAndResizeListeners();
    }
  };

  private loadImage() {
    this.imageVisible = true;
    this.requestUpdate();
  }

  private handleLoad = (e: Event) => {
    this.dispatchEvent(new CustomEvent('image-loaded', {
      detail: e,
      bubbles: true,
      composed: true,
    }));
  };

  render() {
    return this.imageVisible
      ? html`<img
        class="lazy-load-image-background ${this.effect} lazy-load-image-loaded"
        src=${this.src}
        width=${this.width}
        height=${this.height}
        imgStyle=${this.imgStyle}
        @load=${this.handleLoad}
      />`
      : html`<img
        class="lazy-load-image-background ${this.effect}"
        src=${this.placeholderSrc}
        width=${this.width}
        height=${this.height}
        imgStyle=${this.imgStyle}
      />`;
  }
}
