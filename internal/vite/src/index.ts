import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

import type { UserConfig } from "vite";

const viteConfig = (packageManifest: Record<string, unknown>): UserConfig => ({
  plugins: [
    react({
      exclude: ["**/*.stories.tsx", "**/*.test.tsx"],
    }),
    svgr(),
    dts({
      exclude: ["node_modules/**", "dist", "**/__tests__/**"],
    }),
  ],
  build: {
    outDir: "dist",
    lib: {
      entry: "./src/index.ts",
      name: "index",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external(id, _, isResolved) {
        if (isResolved) {
          return false;
        }

        const peerDependencies = Object.keys(
          packageManifest.peerDependencies ?? {},
        );
        return peerDependencies.some((packageName) => {
          return id === packageName || id.startsWith(`${packageName}/`);
        });
      },
    },
  },
});

export { viteConfig };
export * from "vite";
