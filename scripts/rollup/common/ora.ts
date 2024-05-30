/*
 * @Author: 卢天宇
 * @Date: 2024-05-07 19:12:03
 * @Description: 打印loading效果
 */
class Ora {
  timer: NodeJS.Timeout | null;
  spinnerIdx: number;
  spinnerChars: string[];
  constructor() {
    this.timer = null;
    this.spinnerIdx = 0;
    this.spinnerChars = ['|', '/', '-', '\\'];
  }
  start() {
    this.timer = setInterval(() => {
      process.stdout.write(`\r${this.spinnerChars[this.spinnerIdx++]} loading...\r`);
      this.spinnerIdx &= this.spinnerChars.length - 1; // 保持索引在数组长度内
    }, 100);
  }
  stop() {
    clearInterval(this.timer!);
    // process.stdout.write(`\rDone!\n`);
    this.spinnerIdx = 0;
  }
}

export default new Ora();
