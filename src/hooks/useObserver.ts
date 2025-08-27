import { RefObject, useEffect, useRef } from "react";

export function useObserver(
  callback: () => void,
  loading: boolean,
  ref: RefObject<HTMLDivElement | null>,
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
    });
    observer.current.observe(element);

    return () => {
      if (observer.current && element) {
        observer.current.unobserve(element);
      }
    };
  }, [ref, callback, loading]);
}
