import path from 'node:path';

import { startCase } from 'lodash';

const getFileName = (filePath: string) => path.basename(filePath, path.extname(filePath));

const getComponentName = (fileName: string) => `Icon${startCase(fileName).split(' ').join('')}`;

const filePathToExport = (filePath: string) => {
  const fileName = getFileName(filePath);
  const componentName = getComponentName(fileName);

  return `export { default as ${componentName} } from './${fileName}'`;
};

const indexTemplate = (filePaths: string[]) => filePaths.map(filePathToExport).join('\n');

const svgrConfig = {
  outDir: 'src/components/icons/generated',
  jsxRuntime: 'automatic',
  ref: true,
  filenameCase: 'kebab',
  typescript: true,
  indexTemplate,
};

export default svgrConfig;
