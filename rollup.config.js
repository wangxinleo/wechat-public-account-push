import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import { defineConfig } from 'rollup'
import * as fs from 'fs-extra'

export default defineConfig({
  input: 'main.js',
  output: {
    file: 'build/index.js',
    format: 'commonjs',
    exports: 'auto',
  },
  external: [
    '@babel/runtime/helpers/asyncToGenerator',
    '@babel/runtime/helpers/defineProperty',
    '@babel/runtime/helpers/slicedToArray',
    '@babel/runtime/helpers/typeof',
    '@babel/runtime/regenerator',
    'node-schedule',
    'axios',
    'jsdom',
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
  }, json(), terser(), babel({
    babelHelpers: 'runtime',
  })],
})
