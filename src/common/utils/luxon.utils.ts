import { DateTime as dt } from 'luxon';

export const durations = (from: Date, to: Date): number =>
  dt.fromJSDate(to).diff(dt.fromJSDate(from)).toObject()?.milliseconds || 0;
