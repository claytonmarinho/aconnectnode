import { exec } from 'node:child_process';

export default class ShellProvider {
  /**
   *
   * @param {import('../container').Context} context
   */
  constructor({ logger }) {
    this.logger = logger;
  }

  /**
   *
   * @param {string} command
   * @returns {Promise<import('child_process').ExecException | string>}
   */
  exec = command =>
    new Promise((resolve, reject) => {
      this.logger.debug(`Executing shell command: ${command}`);
      exec(command, (error, stdout, stderr) => {
        if (stdout) {
          this.logger.debug(`Shell command output: ${stdout}`);
          resolve(stdout);
        }

        if (error) {
          this.logger.warn(`Shell command error: ${stdout}`);
          reject(error);
          return;
        }

        if (stderr) {
          this.logger.warn(`Shell command stderr: ${stdout}`);
          reject(stderr);
          return;
        }

        resolve(null);
      });
    });
}
