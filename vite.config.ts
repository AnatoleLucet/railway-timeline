import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import graphqlCodegen from "vite-plugin-graphql-codegen";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    graphqlCodegen(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({ customViteReactPlugin: true }),
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: true,
  },
});
