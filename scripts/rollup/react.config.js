/*
 * @Author: 卢天宇
 * @Date: 2024-05-07 17:49:38
 * @Description: react 打包配置文件
 */
import { getPackageJson, resolvePkgPath, getBaseRollupPlugins } from './utils';
import cleanPlugin from './common/cleanPlugin';

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
    plugins: [cleanPlugin({ targets: ['dist'], verbose: true }), getBaseRollupPlugins()]
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
    plugins: [getBaseRollupPlugins()]
  }
];
