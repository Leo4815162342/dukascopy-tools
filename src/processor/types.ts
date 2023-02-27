import { InstrumentType } from './../config/instruments';
import { BufferObject } from '../buffer-fetcher/types';
import { TimeframeType } from '../config/timeframes';
import { PriceType } from '../config/price-types';
import { VolumeUnitType } from '../config/volume-unit';

export interface ProcessDataInput {
  instrument: InstrumentType;
  requestedTimeframe: TimeframeType;
  bufferObjects: BufferObject[];
  priceType: PriceType;
  volumes: boolean;
  volumeUnit: VolumeUnitType;
  ignoreFlats: boolean;
}

export type ProcessDataOutput = number[][];
