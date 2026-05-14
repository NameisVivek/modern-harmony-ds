import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/components', 'src/lib.ts'],
      outDir: 'dist',
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib.ts'),
      name: 'ModernHarmony',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        // Keep font filenames clean (no hash) so they're predictable
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.match(/\.(otf|ttf|woff|woff2)$/)) {
            return 'fonts/[name][extname]'
          }
          return '[name][extname]'
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false, // single style.css output
  },
})
