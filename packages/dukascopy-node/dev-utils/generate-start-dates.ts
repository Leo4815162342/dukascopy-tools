/* eslint-disable no-console */
import fs from 'fs';
import { promisify } from 'util';

import { Instrument } from '../src/config/instruments';
import { getMinStartDate } from './min-start-date';

const writeFile = promisify(fs.readFile);

(async () => {
  try {
    const data: string[][] = [];

    for (const instrument of Object.keys(Instrument)) {
      const minstarDate = await getMinStartDate(instrument);
      data.push([instrument, minstarDate]);
      await wait(5000);
    }

    await writeFile('instrumentsWithStartDates.json', JSON.stringify(data, null, 2));
    console.log('DONE');
  } catch (error) {
    console.log(error);
  }
})();

function wait(ms: number): Promise<void> {
  return new Promise(res => {
    console.log('Start waiting');
    setTimeout(function () {
      console.log('Finish waiting');
      res();
    }, ms);
  });
}
