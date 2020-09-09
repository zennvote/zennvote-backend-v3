import { google, sheets_v4 as sheetsV4 } from 'googleapis';

import Song from '@src/domain/Song';
import config from '@src/config';
import Producer from '@src/domain/Producer';
import { getAuthorizedClient } from './auth';

type GetSheetBody = sheetsV4.Params$Resource$Spreadsheets$Get;
type Sheet = sheetsV4.Schema$Sheet;
type RowData = sheetsV4.Schema$RowData;
type CellData = sheetsV4.Schema$CellData;

const getSheetRequest = async () => {
  const auth = await getAuthorizedClient();
  const sheet = google.sheets({ auth, version: 'v4' });

  return sheet;
};

const getSheet = async (spreadsheetId: string, range: string) => {
  const req = await getSheetRequest();
  const body: GetSheetBody = { spreadsheetId, ranges: [range], includeGridData: true };

  const res = await req.spreadsheets.get(body);
  const sheets = res.data.sheets as Sheet[];

  return sheets[0];
};

const getRows = ({ data }: Sheet) => data?.[0].rowData ?? [];

const formatEpisodeData = (cell: CellData, episode: number, index: number): Song | undefined => {
  const rawValue = cell.effectiveValue?.stringValue;

  if (!rawValue) return;

  const color = cell.effectiveFormat?.backgroundColor;
  const votable = (color?.red ?? 0) < 0.9 || color?.red === 1;
  const isOpening = index === 26;

  const values = rawValue.slice((!isOpening && index > 9) ? 4 : 3).split(':').map((value) => value.trim());

  const isRookie = values[0].startsWith('[데뷔] ');
  if (isRookie) {
    values[0] = values[0].slice(5);
  }

  const [uploader, title] = values;
  const episodeData = { episode, index: isOpening ? -1 : index };

  return { votable, isRookie, uploader, title, episode: episodeData };
};

const formatDayData = (episodes: RowData, index: number) => episodes.values
    ?.map((cell, episode) => formatEpisodeData(cell, episode + 1, index + 1))
    .filter((episode) => episode !== undefined) as Song[]
    ?? [];

export const getSeasonData = async (season: number) => {
  const sheetId = config.seasonSheetId as string;
  const range = `시즌 ${season}!B2:K27`;
  const sheet = await getSheet(sheetId, range);

  const rows = getRows(sheet);
  const values = rows.map((episode, index) => formatDayData(episode, index));
  const songList = ([] as Song[])
    .concat(...values)
    .map<Song>((song) => ({
      ...song,
      episode: {
        episode: song.episode.episode + (season - 1) * 10,
        index: song.episode.index,
      },
    }));

  return season === 11 ? songList : songList.map((song) => ({ ...song, votable: false }));
};

const formatProducerData = (values: CellData[] | undefined): Producer | undefined => {
  if (values === undefined || !values?.[0]?.formattedValue) {
    return undefined;
  }

  return {
    name: values[0].formattedValue,
    songs: values.slice(1)
      .map((value) => value.formattedValue)
      .filter<string>((value): value is string => value !== null && value !== undefined)
      .map((value) => {
        const [episode, index] = value.split(' ')[0].split('-');

        return { episode: parseInt(episode, 10), index: parseInt(index, 10) };
      }),
  };
};

export const getProducerData = async () => {
  const sheetId = config.producerSheetId as string;
  const range = '1.노래자랑P DB!B3:AK';
  const sheet = await getSheet(sheetId, range);

  const rows = getRows(sheet);

  return rows
    .map(({ values }) => formatProducerData(values))
    .filter((value) => value !== undefined) as Producer[];
};
