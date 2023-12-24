type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

export default function debounce<T extends (...args: any[]) => any>(func: T, delay: number): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}


