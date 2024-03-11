// https://www.robinwieruch.de/vite-eslint/
import eslint from 'vite-plugin-eslint'
import { defineConfig } from 'vite'

const API_URLS = {
  development: 'http://localhost:5173'
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`Vite running in mode ${mode}`)

  return {
    plugins: [eslint()],
    define: {
      URL_API: JSON.stringify(API_URLS[mode]),
      VERSION: JSON.stringify(require('./package.json').version)
    }
  }
})
