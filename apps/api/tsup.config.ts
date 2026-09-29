import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  target: 'node20',
  platform: 'node',
  clean: true,
  sourcemap: true,
  // Bundle the workspace package (it ships TypeScript source).
  noExternal: [/^@slingshot\//],
});
