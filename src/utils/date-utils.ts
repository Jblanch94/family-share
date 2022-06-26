export function calculateRelativeTimeDifference(
  timestamp: number,
  locale: string
) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const currentTime = Date.now();
  const timeElapsed = currentTime - timestamp;
  const relativeTimeFormat = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  if (timeElapsed < msPerMinute) {
    return relativeTimeFormat.format(
      -Math.floor(timeElapsed / 1000),
      "seconds"
    );
  } else if (timeElapsed < msPerHour) {
    return relativeTimeFormat.format(
      -Math.floor(timeElapsed / msPerMinute),
      "minutes"
    );
  } else if (timeElapsed < msPerDay) {
    return relativeTimeFormat.format(
      -Math.floor(timeElapsed / msPerHour),
      "hours"
    );
  } else if (timeElapsed < msPerMonth) {
    return relativeTimeFormat.format(
      -Math.floor(timeElapsed / msPerDay),
      "days"
    );
  } else if (timeElapsed < msPerYear) {
    return relativeTimeFormat.format(
      -Math.floor(timeElapsed / msPerYear),
      "months"
    );
  }

  return relativeTimeFormat.format(-Math.floor(msPerYear), "years");
}
