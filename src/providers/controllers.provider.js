export default class ControllersProvider {
  /**
   * @param {import('../container.js').Context} context
   */
  constructor({ shell, logger, config }) {
    this.shell = shell;
    this.logger = logger;
    this.config = config;
  }

  #setConnections = () => {
    for (const connection of this.config.connections) {
      this.#connect(connection);
    }
  };

  #setConnectionInverval = () => {
    this.logger.info(`Checking controllers every ${this.config.reconnectInterval}ms`);

    this.checkControllersInterval = setInterval(async () => {
      this.#setConnections();
    }, this.config.reconnectInterval);
  };

  /**
   * @param {import('./config.provider.js').Connection} connection
   */
  #connect = async ({ source, destination }) => {
    try {
      this.logger.info(`Connecting ${source} to ${destination}`);
      await this.shell.exec(`aconnect ${source} ${destination}`);
    } catch (error) {
      if (error.message?.includes('Connection is already subscribed')) {
        this.logger.debug(`Connection ${source} to ${destination} already exists, skip`);
      } else {
        this.logger.error(`Error connecting ${source} to ${destination} - ${error.message}`);
        throw error;
      }
    }
  };

  makeConnections = async () => {
    this.#setConnectionInverval();
    this.#setConnections();
  };
}
