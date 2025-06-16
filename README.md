# lazy-load-image-lit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/lazy-load-image-lit.svg)](https://www.npmjs.com/package/lazy-load-image-lit)
[![npm downloads](https://img.shields.io/npm/dm/lazy-load-image.svg)](https://www.npmjs.com/package/lazy-load-image)

A lightweight, framework-agnostic lazy loading image component built with Lit Element. Load images only when they're visible to improve page performance and user experience.

# [Live Demo](https://lazy-load-image-demo.vercel.app/)

## Why I Built This

I was inspired by the popular [`react-lazy-load-image-component`](https://www.npmjs.com/package/react-lazy-load-image-component), which works great but is limited to React applications. I wanted to create something with the same powerful lazy loading capabilities but that would work universally across all frameworks and vanilla JavaScript.

By building with Lit Element, this component:

- Works in any framework (React, Vue, Angular, Svelte) or no framework at all
- Stays lightweight with minimal dependencies
- Achieves excellent performance through efficient rendering
- Provides a clean, standards-based API

## Features

### Performance Focused

Images load only when they enter (or approach) the viewport, significantly reducing initial page load time and saving bandwidth.

### Progressive Enhancement

Uses IntersectionObserver API for modern browsers with intelligent fallback to optimized scroll events for older browsers.

### Visual Transitions

Smooth loading effects with multiple options:

- **Blur Effect**: Starts with a blurred placeholder that sharpens when loaded.
- **Black and White Effect**: Shows a grayscale version that transitions to full color.


### Highly Configurable

- Control threshold distance for preloading images.
- Choose between debounce or throttle for scroll performance optimization.
- Configure with visible-by-default option for above-the-fold content.
- Set specific dimensions or use responsive sizing.

### Responsive & Mobile-Friendly

Works seamlessly across all device sizes and adapts to different viewport dimensions.

### Zero External Dependencies

Only depends on Lit, which is included in the bundle.

### Framework Agnostic

Works natively in any environment:

- Vanilla HTML/JS projects.
- React applications with proper event handling.
- Vue.js with native custom element support.
- Angular with CUSTOM_ELEMENTS_SCHEMA.
- Any other modern framework.

## Peer Dependency Required

> **Important:**
> This package requires [`lit`](https://www.npmjs.com/package/lit) as a peer dependency. You must install it in your project:
>
> ```bash
> npm install lit
> ```

## Installation

```bash
npm install lazy-load-image-lit
```

## Basic Usage

```html
<!-- Import the component -->
<script type="module" src="node_modules/lazy-load-image-lit/dist/lazy-load-image-lit.es.js"></script>

<!-- Use it in your HTML -->
<lazy-img
  src="high-quality-image.jpg"
  placeholderSrc="low-quality-thumbnail.jpg"
  effect="blur"
  threshold="200"
></lazy-img>
```

## Framework Examples

### React

```jsx
import React, { useRef, useEffect } from 'react';
import 'lazy-load-image-lit';

function MyImage({ src, placeholder }) {
  const imgRef = useRef(null);
  
  useEffect(() => {
    // Use event listener for React integration
    if (imgRef.current) {
      imgRef.current.addEventListener('image-loaded', (e) => {
        console.log('Image loaded in React!', e.detail);
      });
    }
  }, []);

  return (
    <lazy-img
      ref={imgRef}
      src={src}
      placeholderSrc={placeholder}
      effect="blur"
    ></lazy-img>
  );
}
```

### Vue

```html
<template>
  <lazy-img
    :src="imageUrl"
    :placeholderSrc="placeholderUrl"
    @image-loaded="onImageLoaded"
  ></lazy-img>
</template>

<script>
import 'lazy-load-image-lit';

export default {
  methods: {
    onImageLoaded(e) {
      console.log('Image loaded in Vue!', e.detail);
    }
  }
}
</script>
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import 'lazy-load-image-lit';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Required for custom elements
})
```

```html
<!-- component.html -->
<lazy-img
  [attr.src]="image.src"
  [attr.placeholderSrc]="image.placeholder"
  (image-loaded)="onImageLoaded($event)"
></lazy-img>
```

## Properties & Attributes

| Property              | Type    | Default   | Description                                                                                                                                                                                                 | Available Options |
|----------------------|---------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|
| `src`                | String  | `''`      | The URL of the main image to be lazy-loaded. When the image is about to enter the viewport, this is set as the `src` of the `<img>` element.                                                                | Any valid image URL |
| `placeholderSrc`     | String  | `''`      | The URL of the placeholder image shown before the main image loads. This is always rendered until the main image is loaded and visible.                                                                      | Any valid image URL |
| `effect`             | String  | `'blur'`  | Visual effect applied to the image during loading. `'blur'` applies a blur to the placeholder, `'black-and-white'` shows a grayscale effect. The effect is removed when the main image loads.                | `'blur'`, `'black-and-white'` |
| `threshold`          | Number  | `0`       | Distance in pixels from the viewport or scroll container at which the image should start loading. For IntersectionObserver, this is used as `rootMargin`. For scroll/resize fallback, the image loads when it is within this many pixels of entering the visible area, allowing for preloading before the image is actually visible. | Any number (e.g., 200 for 200px) |
| `useIntersectionObserver` | Boolean | `true` | If `true`, uses the IntersectionObserver API for efficient lazy loading. If `false`, falls back to scroll/resize event listeners for visibility detection.                                                  | `true`, `false` |
| `visibleByDefault`   | Boolean | `false`   | If `true`, the image loads immediately without lazy loading. Useful for above-the-fold images. If `false`, lazy loading is enabled.                                                                          | `true`, `false` |
| `delayMethod`        | String  | `'debounce'` | Method for handling scroll/resize events: `'debounce'` waits for a pause in events, `'throttle'` limits event frequency. Only used when not using IntersectionObserver.                                      | `'debounce'`, `'throttle'` |
| `delayTime`          | Number  | `300`       | Time in milliseconds for throttling or debouncing scroll/resize events. Controls how often visibility checks are performed.                                                                                  | Any positive number |
| `width`              | Number  | `0`       | Width of the image in pixels. Passed directly to the `<img>` element. If `0`, the attribute is omitted and the image uses its natural width or CSS.                                                          | Any valid pixel value |
| `height`             | Number  | `0`       | Height of the image in pixels. Passed directly to the `<img>` element. If `0`, the attribute is omitted and the image uses its natural height or CSS.                                                        | Any valid pixel value |
| `imgStyle`           | String  | `''`      | Additional inline styles to apply to the `<img>` element. Useful for custom styling or responsive images.                                                                                                    | Any valid CSS style string |

## Events

| Event Name | When It Fires | Data Provided |
|------------|---------------|--------------|
| `image-loaded` | When the main image has finished loading | Original image load event in the detail property |


### Window Scroll

![ScreenRecording2025-06-16at20 29 45-ezgif com-optimize](https://github.com/user-attachments/assets/bd864422-3c71-4fe2-8015-92f9b3215099)

### Vertical-Container

![ScreenRecording2025-06-16at20 32 01-ezgif com-optimize](https://github.com/user-attachments/assets/cf855f70-9418-488d-8c64-60caa1cdcf68)

### Horizontal Scroll

![horizontal-ezgif com-optimize](https://github.com/user-attachments/assets/4bbcea08-8542-45a1-85a4-a50df0fa9baf)





## Advanced Configuration

### Preloading Images Just Before Scrolling

```html
<!-- Start loading when image is 500px before entering viewport -->
<lazy-img 
  threshold="500" 
  src="large-image.jpg" 
  placeholderSrc="thumbnail.jpg"
></lazy-img>
```

### Controlling Scroll Event Performance

For smooth scrolling with many images:

```html
<!-- Use throttling for better scroll performance -->
<lazy-img 
  delayMethod="throttle" 
  delayTime="150"
  src="image.jpg" 
  placeholderSrc="small.jpg"
></lazy-img>
```
