/*
 * @Author: 卢天宇
 * @Date: 2024-05-07 17:49:38
 * @Description: react 打包配置文件
 */
import { getPackageJson, resolvePkgPath, getBaseRollupPlugins } from './utils';
import cleanPlugin from './common/cleanPlugin';
import { terser } from 'rollup-plugin-terser';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, module } = getPackageJson('react');
const pkgPath = resolvePkgPath(name);
const pkgDistPath = resolvePkgPath(name, true);

export default [
  // * react
  {
    input: `${pkgPath}/${module}`,
    output: {
      file: `${pkgDistPath}/index.js`,
      name: 'index.js',
      format: 'umd'
    },
    plugins: [
      cleanPlugin({ targets: ['dist'], verbose: true }),
      ...getBaseRollupPlugins(),
      generatePackageJson({
        inputFolder: pkgPath,
        outputFolder: pkgDistPath,
        baseContents: ({ name, description, version }) => ({ name, description, version, main: 'index.js' })
      })
    ]
  },
  // * jsx-runtime
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      // jsx-runtime
      {
        file: `${pkgDistPath}/jsx-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd'
      },
      // jsx-dev-runtime
      {
        file: `${pkgDistPath}/jsx-dev-runtime.js`,
        name: 'jsx-dev-runtime.js',
        format: 'umd'
      }
    ],
    plugins: [...getBaseRollupPlugins()]
  }
];
