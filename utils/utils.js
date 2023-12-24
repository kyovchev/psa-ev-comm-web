const { DateTime } = require("luxon");

export function formatPosixTimestamp(timestamp) {
  if (timestamp == "-") return "-";
  const dt = DateTime.fromSeconds(timestamp);
  return dt.setLocale("bg").toLocaleString(DateTime.DATETIME_SHORT);
}

export function formatStringTimestamp(timestamp) {
  if (timestamp == "-") return "-";
  const dt = DateTime.fromISO(
    timestamp.substring(0, 10) + "T" + timestamp.substring(11, 25)
  );
  return dt.setLocale("bg").toLocaleString(DateTime.DATETIME_SHORT);
}

export function formatDurationString(duration) {
  const dt = duration.substring(2, duration.length - 1).split("H");
  if (dt[0] === undefined) return dt[1] + " минути";
  else if (dt[1] === undefined) return dt[0] + " часа";
  else return dt[0] + " часа и " + dt[1] + " минути";
}
