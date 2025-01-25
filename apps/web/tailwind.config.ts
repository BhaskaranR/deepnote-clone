import baseConfig from "@deepnote-clone/ui/tailwind.config";
import editorConfig from "@deepnote-clone/editor/tailwind.config";

import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}", "../../packages/editor/src/**/*.{ts,tsx}"],
  presets: [baseConfig, editorConfig],
} satisfies Config;
