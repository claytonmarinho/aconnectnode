import { exec } from 'node:child_process';

export default class ShellProvider {
  /**
   *
   * @param {import('../container').Context} context
   */
  constructor() {}

  /**
   *
   * @param {string} command
   * @returns {Promise<import('child_process').ExecException | string>}
   */
  exec = command =>
    new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (stdout) {
          resolve(stdout);
        }

        if (error) {
          reject(error);
          return;
        }

        if (stderr) {
          reject(stderr);
          return;
        }

        resolve(null);
      });
    });
}
