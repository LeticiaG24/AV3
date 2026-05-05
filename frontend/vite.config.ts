import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Permite que o Vite aceite conexões de fora do container
    host: true, 
    strictPort: true,
    port: 5173,
    watch: {
      // Força o monitoramento de arquivos via "polling"
      // Necessário para volumes montados via Docker no Windows
      usePolling: true,
    },
  },
})
