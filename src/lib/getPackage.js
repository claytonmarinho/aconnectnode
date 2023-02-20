import path from 'path';
import getFileContent from './getFileContent.js';

/**
 * @typedef PackageInfo
 * @property {string} name
 * @property {string} version
 * @property {string} description
 * @property {{url: string}} repository
 */

/**
 *
 * @returns {Promise<Error | PackageInfo>}
 */
const getPackage = async () => {
  try {
    const pkgPath = path.resolve(process.env.PWD, './package.json');
    const pkgContent = await getFileContent(pkgPath);
    return JSON.parse(pkgContent);
  } catch (error) {
    console.error(`Could not read package.json file: ${error.message}`);
    throw error;
  }
};

export default getPackage;
