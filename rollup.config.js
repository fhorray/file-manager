import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

export default [
  // Configuração para compilar o código JavaScript (ESM + CJS)
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: ['react', 'react-dom'],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      json(),

      alias({
        entries: [
          {
            find: '../dosya.config',
            replacement: process.cwd() + '/dosya.config.ts',
          }, // Melhorando o alias
          { find: '@libs', replacement: process.cwd() + '/src/libs' }, // Adicionando alias útil
        ],
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        outDir: 'dist', // Corrigido para garantir saída correta
        emitDeclarationOnly: false,
        include: ['src/**/*.ts', 'src/**/*.tsx'],
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react', '@babel/preset-typescript'],
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      terser(),
    ],
  },
  // Configuração para gerar os arquivos de tipos `.d.ts`
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
  // Configuração adicional para tipos específicos
  {
    input: 'src/types.ts',
    output: {
      file: 'dist/types/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
