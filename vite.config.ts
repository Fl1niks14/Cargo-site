import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Cargo-site/", // Буква C обязательно должна быть заглавной!
  plugins: [react()],
});
