import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // Only split libs that do NOT depend on React at module init.
          // Splitting React away from UI libs causes:
          // "Cannot read properties of undefined (reading 'createContext')"
          if (id.includes('@supabase')) return 'supabase';

          if (
            id.includes('react') ||
            id.includes('scheduler') ||
            id.includes('use-sync-external-store') ||
            id.includes('@radix-ui') ||
            id.includes('@tanstack') ||
            id.includes('react-router') ||
            id.includes('sonner') ||
            id.includes('next-themes') ||
            id.includes('lucide-react') ||
            id.includes('recharts') ||
            id.includes('d3-') ||
            id.includes('vaul') ||
            id.includes('cmdk') ||
            id.includes('embla') ||
            id.includes('@hookform') ||
            id.includes('react-hook-form') ||
            id.includes('react-day-picker') ||
            id.includes('react-resizable') ||
            id.includes('input-otp')
          ) {
            return 'react-vendor';
          }

          return 'vendor';
        },
      },
    },
  },
}));
