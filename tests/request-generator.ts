import { generateRequestData } from './../src/request-generator';
import { HistoryConfig } from './../src/config/types';
import { expect } from 'chai';

import 'mocha';

describe('Request generator', () => {
  describe('Tick data', () => {
    describe('EURUSD, tick, 2019-02-27 - 2019-02-28, 360 min. UTC Offset', () => {
      const searchConfig: HistoryConfig = {
        symbol: 'eurusd',
        dates: {
          start: '2019-02-27',
          end: '2019-02-28'
        },
        timeframe: 'tick',
        gmtOffset: 360
      };

      const requestData = generateRequestData(searchConfig);

      it('should contain 24 items', () => {
        expect(requestData).to.have.lengthOf(24);
      });

      it('should contain properly incremented timestamp values for each object', () => {
        const startTs = 1551225600000 + 6 * 60 * 60 * 1000;
        requestData.forEach(({ timestamp }, i) =>
          expect(timestamp).to.equal(startTs + i * 3600000)
        );
      });

      it('should have correct URL for first object', () => {
        expect(requestData[0].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/EURUSD/2019/01/27/06h_ticks.bi5'
        );
      });

      it('should have correct URL for last object', () => {
        expect(requestData[requestData.length - 1].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/EURUSD/2019/01/28/05h_ticks.bi5'
        );
      });
    });

    describe('GBPUSD, tick, 2018-11-07 - 2018-11-09, 0 min. UTC Offset', () => {
      const searchConfig: HistoryConfig = {
        symbol: 'gbpusd',
        dates: {
          start: '2018-11-07',
          end: '2018-11-09'
        },
        timeframe: 'tick',
        gmtOffset: 0
      };

      const requestData = generateRequestData(searchConfig);

      it('should contain 48 items', () => {
        expect(requestData).to.have.lengthOf(48);
      });

      it('should contain properly incremented timestamp values for each object', () => {
        const startTs = 1541548800000;
        requestData.forEach(({ timestamp }, i) =>
          expect(timestamp).to.equal(startTs + i * 3600000)
        );
      });

      it('should have correct URL for first object', () => {
        expect(requestData[0].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/GBPUSD/2018/10/07/00h_ticks.bi5'
        );
      });

      it('should have correct URL for last object', () => {
        expect(requestData[requestData.length - 1].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/GBPUSD/2018/10/08/23h_ticks.bi5'
        );
      });
    });

    describe('BTCUSD, tick, 2017-12-31 - 2018-01-05, -120 min. UTC Offset', () => {
      const searchConfig: HistoryConfig = {
        symbol: 'btcusd',
        dates: {
          start: '2017-12-31',
          end: '2018-01-05'
        },
        timeframe: 'tick',
        gmtOffset: -120
      };

      const requestData = generateRequestData(searchConfig);

      it('should contain 120 items', () => {
        expect(requestData).to.have.lengthOf(120);
      });

      it('should contain properly incremented timestamp values for each object', () => {
        const startTs = 1514678400000 - 2 * 3600000;
        requestData.forEach(({ timestamp }, i) =>
          expect(timestamp).to.equal(startTs + i * 3600000)
        );
      });

      it('should have correct URL for first object', () => {
        expect(requestData[0].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/BTCUSD/2017/11/30/22h_ticks.bi5'
        );
      });

      it('should have correct URL for last object', () => {
        expect(requestData[requestData.length - 1].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/BTCUSD/2018/00/04/21h_ticks.bi5'
        );
      });
    });

    describe('AUDCAD, tick, 2016-07-01 10:00 - 2016-07-01 12:00, 0 min. UTC Offset', () => {
      const searchConfig: HistoryConfig = {
        symbol: 'audcad',
        dates: {
          start: '2016-07-01 10:00',
          end: '2016-07-01 12:00'
        },
        timeframe: 'tick',
        gmtOffset: 0
      };

      const requestData = generateRequestData(searchConfig);

      it('should contain 2 items', () => {
        expect(requestData).to.have.lengthOf(2);
      });

      it('should contain properly incremented timestamp values for each object', () => {
        const startTs = 1467367200000;
        requestData.forEach(({ timestamp }, i) =>
          expect(timestamp).to.equal(startTs + i * 3600000)
        );
      });

      it('should have correct URL for first object', () => {
        expect(requestData[0].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/AUDCAD/2016/06/01/10h_ticks.bi5'
        );
      });

      it('should have correct URL for last object', () => {
        expect(requestData[requestData.length - 1].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/AUDCAD/2016/06/01/11h_ticks.bi5'
        );
      });
    });

    describe('GBPJPY, tick, 2016-12-31 20:00 - 2017-01-01 17:00, -60 min. UTC Offset', () => {
      const searchConfig: HistoryConfig = {
        symbol: 'gbpjpy',
        dates: {
          start: '2016-12-31 20:00',
          end: '2017-01-01 17:00'
        },
        timeframe: 'tick',
        gmtOffset: -60
      };

      const requestData = generateRequestData(searchConfig);

      it('should contain 21 items', () => {
        expect(requestData).to.have.lengthOf(21);
      });

      it('should contain properly incremented timestamp values for each object', () => {
        const startTs = 1483210800000;
        requestData.forEach(({ timestamp }, i) =>
          expect(timestamp).to.equal(startTs + i * 3600000)
        );
      });

      it('should have correct URL for first object', () => {
        expect(requestData[0].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/GBPJPY/2016/11/31/19h_ticks.bi5'
        );
      });

      it('should have correct URL for last object', () => {
        expect(requestData[requestData.length - 1].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/GBPJPY/2017/00/01/15h_ticks.bi5'
        );
      });
    });
  });

  describe('Minute data', () => {
    describe('NZDCAD, m1, ask, 2012-02-01 - 2012-02-29, 0 min. UTC Offset', () => {
      const searchConfig: HistoryConfig = {
        symbol: 'nzdcad',
        dates: {
          start: '2012-02-01',
          end: '2012-02-29'
        },
        timeframe: 'm1',
        priceType: 'ask',
        gmtOffset: 0
      };

      const requestData = generateRequestData(searchConfig);

      it('should contain 28 items', () => {
        expect(requestData).to.have.lengthOf(28);
      });

      it('should contain properly incremented timestamp values for each object', () => {
        const startTs = 1328054400000;
        requestData.forEach(({ timestamp }, i) =>
          expect(timestamp).to.equal(startTs + i * 86400000)
        );
      });

      it('should have correct URL for first object', () => {
        expect(requestData[0].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/NZDCAD/2012/01/01/ASK_candles_min_1.bi5'
        );
      });

      it('should have correct URL for last object', () => {
        expect(requestData[requestData.length - 1].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/NZDCAD/2012/01/28/ASK_candles_min_1.bi5'
        );
      });
    });

    describe('CADCHF, m1, bid, 2016-01-01 - 2018-01-01, 0 min. UTC Offset', () => {
      const searchConfig: HistoryConfig = {
        symbol: 'cadchf',
        dates: {
          start: '2016-01-01',
          end: '2018-01-01'
        },
        timeframe: 'm1',
        priceType: 'bid',
        gmtOffset: 0
      };

      const requestData = generateRequestData(searchConfig);

      it('should contain 731 items', () => {
        expect(requestData).to.have.lengthOf(731);
      });

      it('should contain properly incremented timestamp values for each object', () => {
        const startTs = 1451606400000;
        requestData.forEach(({ timestamp }, i) =>
          expect(timestamp).to.equal(startTs + i * 86400000)
        );
      });

      it('should have correct URL for first object', () => {
        expect(requestData[0].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/CADCHF/2016/00/01/BID_candles_min_1.bi5'
        );
      });

      it('should have correct URL for last object', () => {
        expect(requestData[requestData.length - 1].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/CADCHF/2017/11/31/BID_candles_min_1.bi5'
        );
      });
    });

    describe('FBUSUSD, m1, ask, 2017-08-15 - 2018-04-15, 360 min. UTC Offset', () => {
      const searchConfig: HistoryConfig = {
        symbol: 'fbususd',
        dates: {
          start: '2017-08-15',
          end: '2018-04-15'
        },
        timeframe: 'm1',
        priceType: 'ask',
        gmtOffset: 360
      };

      const requestData = generateRequestData(searchConfig);

      it('should contain 244 items', () => {
        expect(requestData).to.have.lengthOf(244);
      });

      it('should contain properly incremented timestamp values for each object', () => {
        const startTs = 1502755200000;
        requestData.forEach(({ timestamp }, i) =>
          expect(timestamp).to.equal(startTs + i * 86400000)
        );
      });

      it('should have correct URL for first object', () => {
        expect(requestData[0].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/FBUSUSD/2017/07/15/ASK_candles_min_1.bi5'
        );
      });

      it('should have correct URL for last object', () => {
        expect(requestData[requestData.length - 1].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/FBUSUSD/2018/03/15/ASK_candles_min_1.bi5'
        );
      });
    });

    describe('USDCHF, m1, bid, 2019-01-01 - 2019-01-02, -600 min. UTC Offset', () => {
      const searchConfig: HistoryConfig = {
        symbol: 'usdchf',
        dates: {
          start: '2019-01-01',
          end: '2019-01-02'
        },
        timeframe: 'm1',
        priceType: 'bid',
        gmtOffset: -600
      };

      const requestData = generateRequestData(searchConfig);

      it('should contain 2 items', () => {
        expect(requestData).to.have.lengthOf(2);
      });

      it('should contain properly incremented timestamp values for each object', () => {
        const startTs = 1546214400000;
        requestData.forEach(({ timestamp }, i) =>
          expect(timestamp).to.equal(startTs + i * 86400000)
        );
      });

      it('should have correct URL for first object', () => {
        expect(requestData[0].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/USDCHF/2018/11/31/BID_candles_min_1.bi5'
        );
      });

      it('should have correct URL for last object', () => {
        expect(requestData[requestData.length - 1].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/USDCHF/2019/00/01/BID_candles_min_1.bi5'
        );
      });
    });
  });

  describe('Hour data', () => {
    describe('EURCAD, h1, bid, 2016-02-05 - 2016-02-20, 0 min. UTC Offset', () => {
      const searchConfig: HistoryConfig = {
        symbol: 'eurcad',
        dates: {
          start: '2016-02-05',
          end: '2016-02-20'
        },
        timeframe: 'h1',
        priceType: 'bid',
        gmtOffset: 0
      };

      const requestData = generateRequestData(searchConfig);

      it('should contain 1 item', () => {
        expect(requestData).to.have.lengthOf(1);
      });

      it('should contain correct timestamp', () => {
        expect(requestData[0].timestamp).to.equal(1454284800000);
      });

      it('should have correct URL', () => {
        expect(requestData[0].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/EURCAD/2016/01/BID_candles_hour_1.bi5'
        );
      });
    });

    describe('USDCAD, h1, ask, 2017-05-02 - 2017-08-31, 0 min. UTC Offset', () => {
      const searchConfig: HistoryConfig = {
        symbol: 'usdcad',
        dates: {
          start: '2017-05-02',
          end: '2017-08-31'
        },
        timeframe: 'h1',
        priceType: 'ask',
        gmtOffset: 0
      };

      const requestData = generateRequestData(searchConfig);

      it('should contain 4 items', () => {
        expect(requestData).to.have.lengthOf(4);
      });

      it('should contain properly incremented timestamp values for each object', () => {
        expect(requestData[0].timestamp).to.equal(1493596800000);
        expect(requestData[1].timestamp).to.equal(1496275200000);
        expect(requestData[2].timestamp).to.equal(1498867200000);
        expect(requestData[3].timestamp).to.equal(1501545600000);
      });

      it('should have correct URL for first object', () => {
        expect(requestData[0].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/USDCAD/2017/04/ASK_candles_hour_1.bi5'
        );
      });

      it('should have correct URL for last object', () => {
        expect(requestData[requestData.length - 1].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/USDCAD/2017/07/ASK_candles_hour_1.bi5'
        );
      });
    });

    describe('GBPJPY, h1, ask, 2018-01-01 - 2018-12-31, -420 min. UTC Offset', () => {
      const searchConfig: HistoryConfig = {
        symbol: 'gbpjpy',
        dates: {
          start: '2018-01-01',
          end: '2018-12-31'
        },
        timeframe: 'h1',
        priceType: 'ask',
        gmtOffset: -420
      };

      const requestData = generateRequestData(searchConfig);

      it('should contain 13 items', () => {
        expect(requestData).to.have.lengthOf(13);
      });

      it('should contain properly incremented timestamp values for each object', () => {
        expect(requestData[0].timestamp).to.equal(1512086400000);
        expect(requestData[1].timestamp).to.equal(1514764800000);
        expect(requestData[2].timestamp).to.equal(1517443200000);
        expect(requestData[3].timestamp).to.equal(1519862400000);
        expect(requestData[4].timestamp).to.equal(1522540800000);
        expect(requestData[5].timestamp).to.equal(1525132800000);
        expect(requestData[6].timestamp).to.equal(1527811200000);
        expect(requestData[7].timestamp).to.equal(1530403200000);
        expect(requestData[8].timestamp).to.equal(1533081600000);
        expect(requestData[9].timestamp).to.equal(1535760000000);
        expect(requestData[10].timestamp).to.equal(1538352000000);
        expect(requestData[11].timestamp).to.equal(1541030400000);
        expect(requestData[12].timestamp).to.equal(1543622400000);
      });

      it('should have correct URL for first object', () => {
        expect(requestData[0].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/GBPJPY/2017/11/ASK_candles_hour_1.bi5'
        );
      });

      it('should have correct URL for last object', () => {
        expect(requestData[requestData.length - 1].url).to.equal(
          'https://datafeed.dukascopy.com/datafeed/GBPJPY/2018/11/ASK_candles_hour_1.bi5'
        );
      });
    });
  });
});
