import { readFile } from 'fs/promises';

/**
 *
 * @param {string} path
 * @return {Promise<string>}
 */
const getFileContent = async path => {
  try {
    return (await readFile(path)).toString();
  } catch (error) {
    console.error(error, `Error reading file: ${path}`);
    throw error;
  }
};

export default getFileContent;
