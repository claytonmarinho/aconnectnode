import { config as initiateEnvConfig } from 'dotenv';
import container, { registerContainer } from './container.js';
import { startServer } from './providers/server.provider.js';

initiateEnvConfig();

(async () => {
  await registerContainer();

  await container.build(async ({ controllers, shell, logger }) => {
    try {
      const aconnect = await shell.exec('which aconnect');
      if (!aconnect) {
        throw new Error('Not possible to find aconnect');
      }
    } catch (error) {
      logger.error(error);
      throw new Error(`aconnect not found. Please install alsa-utils. - ${error.message}`);
    }

    await controllers.makeConnections();
  });
  await container.build(startServer)();
})();
