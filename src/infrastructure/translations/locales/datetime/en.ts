const dateTimeFormats = {
  short: {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  },
  long: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
  },
  date: {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
  },
}

export default dateTimeFormats;
