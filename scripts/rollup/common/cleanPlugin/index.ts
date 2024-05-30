/*
 * @Author: 卢天宇
 * @Date: 2024-05-07 18:31:43
 * @Description:
 */
import path from 'path';
import { exec } from 'child_process';
import ora from '../ora';
import { cleanPluginType } from './types';

function clean(path: string) {
  return new Promise((resolve, reject) => {
    exec(`npx rimraf ${path}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`执行错误：${error}`);
        reject(`执行错误：${error}`);
        return;
      }
      if (stderr) {
        console.error(`shell错误输出：${stderr}`);
      }
      console.log(`标准输出：\n${stdout}`);
      resolve(true);
    });
  });
}

export default function (options: cleanPluginType = { targets: [], verbose: false }) {
  const { targets = [], ...otherOptions } = options;
  return {
    buildStart() {
      ora.start();
      const promises = targets.map(target => {
        const location = path.resolve(target);
        return clean(location);
      });
      return Promise.all(promises)
        .then(() => {
          if (otherOptions.verbose) {
            console.log('tips: \x1b[32m%s', 'Cleared', '\x1b[1m\x1b[31m', targets.join(','));
          }
        })
        .catch(err => {
          console.error('报错了', err.message);
        })
        .finally(() => {
          ora.stop();
        });
    }
  };
}
