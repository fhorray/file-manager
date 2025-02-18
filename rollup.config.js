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
  // Configuração para compilar o código JS
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
          },
        ],
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist/types',
        emitDeclarationOnly: false, // Gera tanto JS quanto declarações
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
  // Configuração para processar os arquivos de tipo `.d.ts`
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
