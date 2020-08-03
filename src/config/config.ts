import NodeEnv from "./NodeEnv";
import * as dotenv from 'dotenv';
import * as path from 'path';

export default () => {
  const env = process.env.NODE_ENV;
  const envPathMap = {
    [NodeEnv.Production]: '.env.prod',
    [NodeEnv.Develop]: '.env.dev',
    default: undefined,
  };
  const fileName = envPathMap[env ?? 'default'];
  
  if (fileName) {
    dotenv.config({ path: path.join(__dirname, '../..', fileName) });
  } else {
    throw new Error('process.env.NODE_ENV not exists');
  }
};
