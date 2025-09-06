import { RefObject, useEffect, useRef } from "react";

export function useObserver(
  callback: () => void,
  loading: boolean,
  ref: RefObject<HTMLDivElement | HTMLUListElement | null>,
  options?: IntersectionObserverInit,
) {
  const observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    if (loading || !ref || !ref.current) return;

    if (observer.current) {
      observer.current.disconnect();
    }
    const element = ref.current;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    }, options);
    observer.current.observe(element);

    return () => {
      if (observer.current && element) {
        observer.current.unobserve(element);
      }
    };
  }, [ref, options, loading, callback]);
}
