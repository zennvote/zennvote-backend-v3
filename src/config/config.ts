import * as dotenv from 'dotenv';
import * as path from 'path';
import NodeEnv from './NodeEnv';

export default () => {
  const env = process.env.NODE_ENV;
  const envPathMap = {
    [NodeEnv.Production]: '.env.prod',
    [NodeEnv.Develop]: '.env.dev',
    [NodeEnv.Local]: '.env.local',
    [NodeEnv.Test]: '.env.test',
    default: undefined,
  };
  const fileName = envPathMap[env ?? 'default'];

  if (fileName) {
    dotenv.config({ path: path.join(__dirname, '../..', fileName) });
  } else {
    throw new Error('process.env.NODE_ENV not exists');
  }
};
