export function formatDuration(duration) {
  if (duration > 24 * 3600) {
    return "You can't enter more than 24 hours";
  }

  const seconds = duration % 60;
  const minutes = Math.floor((duration / 60) % 60);
  const hours = Math.floor(duration / 3600);

  let result = "";

  if (hours > 0) {
    result += hours + " hours ";
  }
  if (minutes > 0) {
    result += minutes + " hours ";
  }
  if (seconds > 0) {
    result += seconds + " hours";
  }

  return result.trim();
}
