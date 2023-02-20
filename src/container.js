import awilix, { asClass, asFunction, asValue } from 'awilix';
import pick from 'lodash/pick.js';

import ControllersProvider from './providers/controllers.provider.js';
import serverProvider from './providers/server.provider.js';
import ShellProvider from './providers/shell.provider.js';
import loggerProvider from './providers/logger.provider.js';
import configProvider from './providers/config.provider.js';
import getPackage from './lib/getPackage.js';

/**
 * @typedef {Object} Context
 * @property {import("express").Express} server
 * @property {import('./providers/shell.provider.js').default} shell
 * @property {import('./providers/controllers.provider.js').default} controllers
 * @property {import('./providers/config.provider.js').Config} config
 * @property {import('./providers/logger.provider.js').default} logger
 */

const container = awilix.createContainer({});

export const registerContainer = async () => {
  const pkgInfo = await getPackage();

  container.register({
    pkg: asValue(pick(pkgInfo, ['name', 'version'])),
    shell: asClass(ShellProvider).singleton(),
    controllers: asClass(ControllersProvider).singleton(),
    logger: asFunction(loggerProvider).singleton(),
    config: asFunction(configProvider).singleton(),
    server: asFunction(serverProvider).singleton(),
  });
};

export default container;
