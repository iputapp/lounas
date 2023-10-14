/**
 * Convert a Date object to a TimeOnly object
 * 1970-01-01 00:00:00+00 (Unix system time zero) [timestamp with time zone]
 * @see {@link https://www.postgresql.org/docs/current/datatype-datetime.html#DATATYPE-DATETIME-SPECIAL-VALUES}
 */
export class TimeOnly extends Date {
  constructor(hour: number, minute: number, second: number) {
    super(1970, 0, 1, hour, minute, second);
  }
}
