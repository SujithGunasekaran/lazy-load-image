# lazy-img

[![npm version](https://img.shields.io/npm/v/lazy-img.svg)](https://www.npmjs.com/package/lazy-img)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, framework-agnostic lazy loading image component built with Lit Element. Load images only when they're visible to improve page performance and user experience.

## Why I Built This

I was inspired by the popular `react-lazy-load-image-component`, which works great but is limited to React applications. I wanted to create something with the same powerful lazy loading capabilities but that would work universally across all frameworks and vanilla JavaScript.

By building with Lit Element, this component:

- Works in any framework (React, Vue, Angular, Svelte) or no framework at all
- Stays lightweight with minimal dependencies
- Achieves excellent performance through efficient rendering
- Provides a clean, standards-based API

## Features

- 🚀 **Performance Focused**: Images load only when they enter (or approach) the viewport, significantly reducing initial page load time and saving bandwidth
- 🔄 **Progressive Enhancement**: Uses IntersectionObserver API for modern browsers with intelligent fallback to optimized scroll events for older browsers
- 🎨 **Visual Transitions**: Smooth loading effects with multiple options:
  - **Blur Effect**: Starts with a blurred placeholder that sharpens when loaded
  - **Black and White Effect**: Shows a grayscale version that transitions to full color
  - **Customizable Transitions**: Clean CSS transitions with configurable timing
- ⚙️ **Highly Configurable**: 
  - Control threshold distance for preloading images
  - Choose between debounce or throttle for scroll performance optimization
  - Configure with visible-by-default option for above-the-fold content
  - Set specific dimensions or use responsive sizing
- 📱 **Responsive & Mobile-Friendly**: Works seamlessly across all device sizes and adapts to different viewport dimensions
- ✅ **Zero External Dependencies**: Only depends on Lit, which is included in the bundle
- 🧩 **Framework Agnostic**: Works natively in any environment:
  - Vanilla HTML/JS projects
  - React applications with proper event handling
  - Vue.js with native custom element support
  - Angular with CUSTOM_ELEMENTS_SCHEMA
  - Any other modern framework


## Installation

```bash
npm install lazy-img
```

## Basic Usage

```html
<!-- Import the component -->
<script type="module" src="node_modules/lazy-img/dist/lazy-img.js"></script>

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
import 'lazy-img';

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
import 'lazy-img';

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
import 'lazy-img';

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

| Property | Type | Default | Description | Available Options |
|----------|------|---------|-------------|-------------------|
| `src` | String | `''` | The URL of the main image to be lazy-loaded | Any valid image URL |
| `placeholderSrc` | String | `''` | URL of the placeholder image shown until the main image loads | Any valid image URL |
| `effect` | String | `'blur'` | Visual transition effect to apply | `'blur'`, `'black-and-white'` |
| `threshold` | Number | `0` | Distance in pixels from viewport when the image should start loading | Any number (e.g., 200 for 200px) |
| `useIntersectionObserver` | Boolean | `true` | Whether to use IntersectionObserver API (modern approach) | `true`, `false` |
| `visibleByDefault` | Boolean | `false` | When true, image loads immediately without lazy loading | `true`, `false` |
| `delayMethod` | String | `'debounce'` | Method for handling scroll events | `'debounce'`, `'throttle'` |
| `delayTime` | Number | `300` | Time in milliseconds for throttling/debouncing events | Any positive number |
| `width` | Number | `0` | Width of the image in pixels | Any valid pixel value |
| `height` | Number | `0` | Height of the image in pixels | Any valid pixel value |
| `imgStyle` | String | `''` | Additional styles to apply to the image | Any valid CSS style string |

## Events

| Event Name | When It Fires | Data Provided |
|------------|---------------|--------------|
| `image-loaded` | When the main image has finished loading | Original image load event in the detail property |


## Why Lit Element?

Lit Element provides several advantages for this component:

- **Small Footprint**: Minimal impact on your bundle size
- **Standard-Based**: Built on modern web component standards
- **Framework Independence**: Works anywhere, no vendor lock-in
- **Efficient Updates**: Smart rendering system that only updates what changes
- **Shadow DOM**: Style encapsulation prevents conflicts with your app's CSS

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

## License

MIT License - Feel free to use in personal and commercial projects.

## Contributing

Contributions, issues and feature requests are welcome!
