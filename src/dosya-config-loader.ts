// dosya-config-loader.ts
import { config } from '../dosya.config';

if (!config) {
  throw new Error(
    'Você precisa criar um arquivo dosya.config.ts que exporte a variável "config".',
  );
}

export default config;
