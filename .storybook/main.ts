import { mergeConfig } from "vite";

export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-designs',
    '@storybook/addon-interactions',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/react-vite',
  features: {
    storyStoreV7: true,
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      optimizeDeps: {
        include: ['storybook-addon-designs', 'storybook-dark-mode'],
      },
    });
  },

  docs: {
    autodocs: true,
  },
};
