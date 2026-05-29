import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    }
  }
}

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: './src/app/routes',
      generatedRouteTree: './src/app/routeTree.gen.ts'
    }),
    figmaAssetResolver(),
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@routes': path.resolve(__dirname, 'src/app/routes'),
      '@components': path.resolve(__dirname, 'src/app/components'),
      '@hooks': path.resolve(__dirname, 'src/app/hooks'),
      '@utils': path.resolve(__dirname, 'src/app/utils'),
      '@assets': path.resolve(__dirname, 'src/app/assets'),
      '@constants': path.resolve(__dirname, 'src/app/constants')
    }
  },
  assetsInclude: ['**/*.svg', '**/*.csv']
})
