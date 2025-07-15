import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: [
      '@atlaskit/pragmatic-drag-and-drop',
      '@atlaskit/pragmatic-drag-and-drop-flourish',
      '@atlaskit/pragmatic-drag-and-drop-hitbox',
      '@atlaskit/pragmatic-drag-and-drop-live-region',
      '@atlaskit/pragmatic-drag-and-drop-auto-scroll',
    ],
  },
});
