import { join, dirname, resolve } from "node:path";

import { wyw, svgr } from "@react-beauty/vite/app";

import type { StorybookConfig } from "@storybook/react-vite";

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

function getStoriesPath(path: string): string {
  const packagePath = resolve(join("../../packages", path, "src"));
  return packagePath + "/**/{stories,story}.{tsx,mdx}";
}

const config: StorybookConfig = {
  stories: [
    getStoriesPath("interfaces/ui-icon"),
    getStoriesPath("interfaces/ui-avatar"),
    getStoriesPath("interfaces/ui-alert"),
    getStoriesPath("interfaces/ui-button"),
  ],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-actions"),
    getAbsolutePath("@storybook/addon-themes"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  viteFinal: async (config) => {
    return {
      ...config,
      plugins: [
        ...(config?.plugins ?? []),
        wyw({
          babelOptions: {
            presets: ["@babel/preset-typescript", "@babel/preset-react"],
          },
        }),
        svgr({ svgrOptions: { icon: true } }),
      ],
    };
  },
};
export default config;
