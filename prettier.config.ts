import { type Config } from 'prettier';
import { type PluginOptions } from 'prettier-plugin-tailwindcss';

const config: Config & PluginOptions = {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80,
  tailwindStylesheet: './src/styles.css',
};

export default config;
