import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lazyImg.ts'),
      name: 'LazyLoadImage',
      fileName: (format) => `lazy-load-image-lit.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // Externalize lit if you want consumers to provide it
      external: ['lit'],
      output: {
        globals: {
          lit: 'lit'
        }
      }
    }
  },
  plugins: [dts({
    entryRoot: 'src',
    include: ['src/lazyImg.ts'],
    outputDir: 'dist',
  })],
});


// import { defineConfig } from 'vite';

// export default defineConfig({
//   build: {
//     lib: {
//       entry: 'src/lazyImg.ts',
//       formats: ['es'],
//       fileName: 'lazy-load-image'
//     },
//     rollupOptions: {
//       output: {
//         assetFileNames: 'assets/[name].[ext]',
//         entryFileNames: '[name].js',
//         chunkFileNames: '[name].js'
//       },
//       external: ['lit']
//     },
//     outDir: 'dist'
//   }
// });



