import babel from 'rollup-plugin-babel';
import vue from "rollup-plugin-vue"
import typescript from 'rollup-plugin-typescript2';
import {DEFAULT_EXTENSIONS} from "@babel/core";

export default {
  input: 'src/index.ts',
  // preserveEntrySignatures: false,
  // 指出应将哪些模块视为外部模块
  plugins: [
    // injectProcessEnv({
    //   NODE_ENV: 'production',
    // }),
    typescript({
      // objectHashIgnoreUnknownHack: true
    }),
    vue({
      css: true,
      compileTemplate: true
    }),
    babel({
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts',
        '.tsx'
      ],
      "presets": ["@babel/preset-env"],
      "plugins": [
        "@vue/babel-plugin-jsx"
      ],
      runtimeHelpers: true,
      exclude: "node_modules/**",
      externalHelpers: true
    }),
  ],
  output: [{ format: 'esm', file: 'dist/index.js' }],
};
