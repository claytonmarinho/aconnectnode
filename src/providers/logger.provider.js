import { threadId, isMainThread } from 'node:worker_threads';
import Logger from 'bunyan';

/**
 *
 * @param {import('../container').Context} context
 * @returns {Logger}
 */
const loggerProvider = ({ pkg, config }) => {
  const logger = Logger.createLogger({
    name: pkg.name,
    stream: process.stdout,
    level: config.logLevel,
    version: pkg.version,
  });

  if (isMainThread) {
    return logger;
  }

  return logger.child({ thread: threadId });
};

export default loggerProvider;
