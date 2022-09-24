import babel from '@rollup/plugin-babel'
import { defineConfig } from 'rollup'

export default defineConfig({
  input: 'main.js',
  output: {
    dir: 'build',
    format: 'commonjs',
    exports: 'default',
  },
  plugins: [babel({
    babelHelpers: 'runtime',
  })],
})
