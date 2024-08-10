import esbuild from "esbuild";
import { dtsPlugin } from 'esbuild-plugin-d.ts';

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  target: ['node14'],
  format: 'esm',
  plugins: [dtsPlugin()],
  outdir: './dist',
  sourcemap: false,
  tsconfig:'./tsconfig.json',
  minify:true
}).catch(() => process.exit(1));

