import { defineConfig } from 'vite'
import fs from 'fs-extra'

export default defineConfig({
  build: {
    lib: {
      entry: 'main.js',
      formats: ['cjs'],
      fileName: () => 'index.js',
    },
    outDir: 'cloud',
    rollupOptions: {
      external: [
        '@babel/runtime/helpers/asyncToGenerator',
        '@babel/runtime/helpers/defineProperty',
        '@babel/runtime/helpers/slicedToArray',
        '@babel/runtime/helpers/typeof',
        '@babel/runtime/regenerator',
        'node-schedule',
        'axios',
        'jsdom',
        'lodash/cloneDeep.js',
        'lunar-javascript',
        'dayjs',
        'dayjs/plugin/timezone.js',
        'dayjs/plugin/utc.js',
      ],
      plugins: [{
        async load(id) {
          if (/\/config\/exp-config\.js$/.test(id)) {
            return (await fs.readFile(id)).toString()
              .replace('import USER_CONFIG from \'./index.cjs\'', 'var USER_CONFIG = require(\'../config/index.cjs\')')
          }
          return null
        },
      }],
    },
  },
})
