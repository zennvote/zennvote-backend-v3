import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { readFileAsync, writeFileAsync } from '@src/infrastructure/file';

import * as fs from 'fs';
import * as readline from 'readline';
import logger from '../logger/logger';

const getCredentials = async () => JSON.parse(await readFileAsync('credentials.json'));

const readTokenFile = () => readFileAsync('token.json');

const checkToken = () => new Promise((resolve) => fs.access('token.json', fs.constants.F_OK, (err) => resolve(!err)));

const getNewToken = (oAuth2Client: OAuth2Client) => new Promise((resolve, reject) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  logger.info(`Authorize this app by visiting this url: ${authUrl}`);

  const readInterface = readline.createInterface({ input: process.stdin, output: process.stdout });

  readInterface.question('Enter the code from that page here: ', async (code) => {
    readInterface.close();

    try {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);

      await writeFileAsync('token.json', JSON.stringify(tokens));

      logger.info('Token stored to token.json');

      resolve(oAuth2Client);
    } catch (err) {
      logger.error('Error while trying to retrieve access token', err);
      reject(err);
    }
  });
});

export const getAuthorizedClient = async () => {
  const { installed } = await getCredentials();
  // eslint-disable-next-line camelcase
  const { client_secret, client_id, redirect_uris } = installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (!(await checkToken())) {
    await getNewToken(oAuth2Client);
  }

  const token = await readTokenFile();
  oAuth2Client.setCredentials(JSON.parse(token));

  return oAuth2Client;
};
