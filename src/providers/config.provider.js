import joi from 'joi';
import pick from 'lodash/pick.js';
import mapKeys from 'lodash/mapKeys.js';
import camelCase from 'lodash/camelCase.js';

const Joi = joi.extend(joi => ({
  type: 'connections',
  base: joi.array(),
  coerce(value) {
    if (!value.split) {
      return { value };
    }

    return {
      value: value
        .trim()
        .split(';')
        .map(connection => connection.trim())
        .filter(Boolean)
        .map(connection => {
          const [source, destination] = connection.split(',');
          const [sourceName, sourcePort = 0] = source.split(':');
          const [destinationName, destinationPort = 0] = destination.split(':');

          return {
            source: `"${sourceName}":${sourcePort}`,
            destination: `"${destinationName}":${destinationPort}`,
          };
        }),
    };
  },
}));

/**
 * @typedef {Object} Connection
 * @property {string} source
 * @property {string} destination
 */

/**
 * @type {Joi.ObjectSchema<Connection>}
 */
const connectionSchema = Joi.object({
  source: Joi.string().required(),
  destination: Joi.string().required(),
});

/**
 * @typedef {Object} Config
 * @property {number} port
 * @property {string} logLevel
 * @property {Connection[]} connections
 * @property {number} reconnectInterval
 */

const envConfigFields = ['PORT', 'LOG_LEVEL', 'CONNECTIONS', 'RECONNECT_INTERVAL'];

/**
 * @type {Joi.ObjectSchema<Config>}
 */
const configSchema = Joi.object({
  port: Joi.number().default(9010),
  logLevel: Joi.string().default('debug'),
  connections: Joi.connections().items(connectionSchema).min(1),
  reconnectInterval: Joi.Joi.alternatives()
    .try(Joi.number(), Joi.string())
    .default(60 * 1000),
});

/**
 * @param {import('../container').Context} context
 * @returns {Promise<Error | Config>}
 */
const configProvider = () => {
  const envConfig = pick(process.env, envConfigFields);
  const config = mapKeys(envConfig, (_, key) => camelCase(key));

  const { error, value: validatedEnvConfig } = configSchema.validate(config, {
    convert: true,
  });

  if (typeof validatedEnvConfig.reconnectInterval === 'string') {
    validatedEnvConfig.reconnectInterval = parseInt(validatedEnvConfig.reconnectInterval);
  }

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return validatedEnvConfig;
};

export default configProvider;
