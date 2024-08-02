export function getCountdown(targetDate: Date) {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const diff = target - now;

  const DAY = 1000 * 60 * 60 * 24;
  const HOUR = 1000 * 60 * 60;
  const MINUTE = 1000 * 60;

  const days = Math.floor(diff / DAY);
  const hours = Math.floor((diff % DAY) / HOUR);
  const minutes = Math.floor((diff % HOUR) / MINUTE);
  const seconds = Math.floor((diff % MINUTE) / 1000);

  return { days, hours, minutes, seconds, diff };
}
