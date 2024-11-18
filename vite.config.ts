import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  return {
    build: {
      sourcemap: isDev,
    },
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      isDev &&
        checker({
          eslint: {
            useFlatConfig: true,
            lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          },
          overlay: {
            position: "bl",
            initialIsOpen: false,
          },
          typescript: true,
        }),
    ],
  };
});
