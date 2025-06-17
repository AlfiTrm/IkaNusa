import { useState, useEffect, useCallback } from "react";

export function useCarousel(length: number) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % length);
  }, [length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  useEffect(() => {
    const timer = setInterval(() => next(), 5000);
    return () => clearInterval(timer);
  }, [next]); 

  return { index, next, prev };
}
