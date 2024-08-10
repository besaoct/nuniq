import esbuild from "esbuild";
import { dtsPlugin } from 'esbuild-plugin-d.ts';

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  target: ['node14'],
  format: 'cjs',
  plugins: [dtsPlugin()],
  outdir: './dist/cjs',
  sourcemap: false,
  minify: true,
  tsconfig:'./tsconfig.json'
}).catch(() => process.exit(1));


esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  target: ['node14'],
  format: 'esm',
  plugins: [dtsPlugin()],
  outdir: './dist/esm',
  sourcemap: false,
  minify: true,
  tsconfig:'./tsconfig.json'
}).catch(() => process.exit(1));
