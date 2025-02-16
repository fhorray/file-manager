import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true, // Apenas true já é suficiente para gerar os arquivos de tipagem
  sourcemap: false, // Desative temporariamente os sourcemaps para depuração
  external: ['react', 'react-dom'],
  clean: true, // Remove arquivos antigos antes de gerar novos
});
