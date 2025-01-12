import { roundNum } from './../utils/general';
import { PriceType } from '../config/price-types';

interface GetOHLCInput {
  input: number[][];
  filterFlats?: boolean;
  startTs?: number;
  volumes: boolean;
}

function getOHLC({
  input,
  filterFlats = true,
  startTs = input[0][0],
  volumes
}: GetOHLCInput): number[] {
  if (filterFlats) {
    // ignoring flat-volumed (0 volume) entries
    input = input.filter(data => data?.[5] !== 0);
  }
  if (input.length === 0) {
    return [];
  }

  let open = 0;
  let high = -Infinity;
  let low = Infinity;
  let close = 0;
  let volume = 0;

  let openPriceDetected = false;
  let closePriceDetected = false;

  let isEmpty = true;

  for (let i = 0, n = input.length; i < n; i++) {
    const head = input[i];
    const tail = input[input.length - 1 - i];

    if (head && Array.isArray(head) && head.length > 0) {
      const [, o, h, l, , v] = head;

      if (!openPriceDetected) {
        open = o;
        openPriceDetected = true;
      }

      if (h > high) {
        high = h;
      }

      if (l < low) {
        low = l;
      }

      if (v) {
        volume += v;
      }

      isEmpty = false;
    }

    if (!closePriceDetected) {
      if (tail && Array.isArray(tail) && tail.length > 0) {
        const [, , , , c] = tail;
        close = c;
        closePriceDetected = true;
      }
    }
  }

  if (isEmpty) {
    return [];
  }

  const ohlc = [startTs, open, high, low, close];

  if (volumes) {
    ohlc.push(roundNum(volume));
  }

  return ohlc;
}

function breakdownByInterval(
  items: number[][],
  interval: number,
  indexFromDateGetter: (date: Date) => number
): number[][][] {
  const dataByInterval: number[][][] = [];

  for (let i = 0, n = interval; i < n; i++) {
    dataByInterval.push([]);
  }

  for (let i = 0, n = items.length; i < n; i++) {
    const data = items[i];
    if (data && Array.isArray(data) && data.length > 0) {
      const date = new Date(data[0]);
      const intervalIndex = indexFromDateGetter(date);
      dataByInterval[intervalIndex].push(data);
    }
  }

  return dataByInterval;
}
interface TicksToOHLCInput {
  ticks: number[][];
  priceType: PriceType;
  startTs: number;
  volumes: boolean;
}

function ticksToOHLC({ ticks, priceType, startTs, volumes }: TicksToOHLCInput): number[] {
  // timestamp, askPrice, bidPrice, askVolume, bidVolume

  const openPrice = priceType === 'ask' ? ticks[0][1] : ticks[0][2];
  const closePrice = priceType === 'ask' ? ticks[ticks.length - 1][1] : ticks[ticks.length - 1][2];
  const initialVolume = priceType === 'ask' ? ticks[0][3] : ticks[0][4];

  const open = openPrice;
  let high = openPrice;
  let low = openPrice;
  const close = closePrice;
  let volume = initialVolume;

  for (let i = 1, n = ticks.length; i < n; i++) {
    const [, askPrice, bidPrice, askVolume, bidVolume] = ticks[i];

    const targetPrice = priceType === 'ask' ? askPrice : bidPrice;
    const targetVolume = priceType === 'ask' ? askVolume : bidVolume;

    if (targetPrice > high) {
      high = targetPrice;
    }

    if (targetPrice < low) {
      low = targetPrice;
    }

    if (targetVolume) {
      volume += targetVolume;
    }
  }

  const ohlc = [startTs, open, high, low, close];

  if (volumes) {
    ohlc.push(roundNum(volume));
  }

  return ohlc;
}

function getMinuteOHLCfromTicks(
  ticks: number[][],
  priceType: PriceType,
  startTs: number,
  volumes: boolean
): number[][] {
  const ticksByMinute = breakdownByInterval(ticks, 60, d => d.getUTCMinutes());
  const ohlc = ticksByMinute.map((data, i) =>
    data.length > 0
      ? ticksToOHLC({ ticks: data, priceType, startTs: startTs + i * 1000 * 60, volumes })
      : []
  );

  return ohlc;
}

function getSecondOHLCfromTicks(
  ticks: number[][],
  priceType: PriceType,
  startTs: number,
  volumes: boolean
): number[][] {
  const ticksBySecond = breakdownByInterval(
    ticks,
    3600,
    d => d.getUTCMinutes() * 60 + d.getUTCSeconds()
  );

  // There can be gaps in the data, so we need to fill them in
  // filling in gaps when there is no ticks for a particular "second" and get date from previous "second"
  // if it is not available, then we just leave it empty

  // TODO: consider cases when the first "second" is empty

  const withGapsFilled: number[][][] = [];
  for (let i = 0; i < ticksBySecond.length; i++) {
    const data = ticksBySecond[i];
    const hasGap = data.length === 0;
    if (hasGap) {
      const prevData = ticksBySecond[i - 1];
      const hasPrevData = prevData && prevData.length > 0;
      if (hasPrevData) {
        withGapsFilled.push(prevData);
      } else {
        withGapsFilled.push([]);
      }
    } else {
      withGapsFilled.push(data);
    }
  }

  const ohlc = withGapsFilled.map((data, i) =>
    data.length > 0
      ? ticksToOHLC({ ticks: data, priceType, startTs: startTs + i * 1000, volumes })
      : []
  );

  return ohlc;
}

function getMonthlyOHLCfromDays(dailyCandles: number[][], volumes: boolean): number[][] {
  const breakdown = breakdownByInterval(dailyCandles, 12, d => d.getUTCMonth());
  const ohlc = breakdown.map(data => (data.length > 0 ? getOHLC({ input: data, volumes }) : []));

  return ohlc;
}

export {
  getOHLC,
  ticksToOHLC,
  breakdownByInterval,
  getSecondOHLCfromTicks,
  getMinuteOHLCfromTicks,
  getMonthlyOHLCfromDays
};
