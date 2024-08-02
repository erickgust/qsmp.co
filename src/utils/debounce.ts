type TimeoutId = ReturnType<typeof setTimeout> | null;

export const debounce = (callback: (...args: any[]) => void, wait: number) => {
  let timeoutId: TimeoutId = null;
  return (...args: any[]) => {
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
