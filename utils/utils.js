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
