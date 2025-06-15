import './lazyImg.ts';

// Add the CSS for the horizontal image container
const style = document.createElement('style');
style.textContent = `
.image-container.horizontal {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  width: 60vw;
  height: 420px;
  padding-bottom: 16px;
  gap: 16px;
  scroll-behavior: smooth;
}

.image-container.horizontal lazy-img {
  flex: 0 0 auto;
  width: 400px;
}
`;
document.head.appendChild(style);

// Add additional styles for the demo
style.textContent += `
  
  h2 {
    margin-top: 40px;
  }
  
  .image-container {
    margin-bottom: 100px;
  }
`;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Lazy Image Loading Demo</h1>
  
  <h2>Scroll down to see lazy-loaded images</h2>
  
  <h2>Vertical Example (Using Scroll Events)</h2>
  <p>These images use scroll events instead of IntersectionObserver</p>
  <div class="image-container">
  <lazy-img
    id="scroll-test-1"
    src="/high-quality.jpg"
    delayMethod="throttle"
    delayTime="300"
    placeholderSrc="/low-quality.jpg"
    effect="blur"
    width="600"
    height="400"
  ></lazy-img>
  <lazy-img
    src="/high-quality.jpg"
    placeholderSrc="/low-quality.jpg"
    effect="blur"
    width="600"
    height="400"
  ></lazy-img>
  <lazy-img
    src="/high-quality.jpg"
    placeholderSrc="/low-quality.jpg"
    effect="blur"
    width="600"
    height="400"
  ></lazy-img>
  <lazy-img
    src="/high-quality.jpg"
    placeholderSrc="/low-quality.jpg"
    effect="blur"
    width="600"
    height="400"
  ></lazy-img>
  <lazy-img
  id="my-image"
    src="/high-quality.jpg"
    placeholderSrc="/low-quality.jpg"
    effect="blur"
    width="600"
    height="400"
  ></lazy-img>
  </div>

  <!-- Horizontal image container example -->
  <h2>Horizontal scrolling example</h2>
  <div class="image-container horizontal">
    <lazy-img
      src="/high-quality.jpg"
      placeholderSrc="/low-quality.jpg"
      effect="blur"
      width="400"
      height="400"
    ></lazy-img>
    <lazy-img
      src="/high-quality.jpg"
      placeholderSrc="/low-quality.jpg"
      effect="blur"
      width="400"
      height="400"
    ></lazy-img>
    <lazy-img
      src="/high-quality.jpg"
      placeholderSrc="/low-quality.jpg"
      effect="blur"
      width="400"
      height="400"
    ></lazy-img>
    <lazy-img
      src="/high-quality.jpg"
      placeholderSrc="/low-quality.jpg"
      effect="blur"
      width="400"
      height="400"
    ></lazy-img>
    <lazy-img
      src="/high-quality.jpg"
      placeholderSrc="/low-quality.jpg"
      effect="blur"
      width="400"
      height="400"
    ></lazy-img>
    <lazy-img
      src="/high-quality.jpg"
      placeholderSrc="/low-quality.jpg"
      effect="blur"
      width="400"
      height="400"
    ></lazy-img>
    <lazy-img
      src="/high-quality.jpg"
      placeholderSrc="/low-quality.jpg"
      effect="blur"
      width="400"
      height="400"
    ></lazy-img>
    <lazy-img
      src="/high-quality.jpg"
      placeholderSrc="/low-quality.jpg"
      effect="blur"
      width="400"
      height="400"
    ></lazy-img>
    <lazy-img
      src="/high-quality.jpg"
      placeholderSrc="/low-quality.jpg"
      effect="blur"
      width="400"
      height="400"
    ></lazy-img>
  </div>
`;



