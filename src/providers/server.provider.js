import express from 'express';

/**
 *
 * @param {import('../container').Context} context
 * @returns {Promise<Error | void>}
 */
export const startServer =
  ({ server, config, logger, pkg }) =>
  () => {
    return new Promise((resolve, reject) => {
      const listener = server.listen(config.port, () => {
        logger.info(`🚀 ${pkg.name}@${pkg.version} is running on http://127.0.0.1:${config.port}`);
        resolve();
      });

      listener.on('error', reject);
    });
  };

/**
 *
 * @param {import('../container').Context} context
 * @returns {express.Express}
 */
const serverProvider = () => {
  const server = express();

  const middlewares = [express.json()];

  for (const middleware of middlewares) {
    server.use(middleware);
  }

  return server;
};

export default serverProvider;
