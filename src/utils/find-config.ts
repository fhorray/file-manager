import fg from 'fast-glob';
import path from 'path';

export async function findDosyaConfig(): Promise<string | null> {
  // Define o padrão: procura por "dosya.config.ts" dentro da pasta "src"
  const pattern = path.join('.', '**', 'dosya.config.ts');

  const files = await fg(pattern);

  if (files && files.length > 0) {
    return files[0];
  }

  return null;
}
