// Fires an event when user scrolls close to bottom of the wrapped child element

import { useEffect, useRef } from "react";

const THRESHOLD_PX = 100;

const ScrollWatcher = ({ children, onNearBottom }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const pageBottom = window.innerHeight;
      const distance = rect.bottom - pageBottom;
      if (distance < THRESHOLD_PX) {
        onNearBottom();
      }
    };
    onScroll();
    el.addEventListener("wheel", onScroll);
    return () => el.removeEventListener("wheel", onScroll);
  }, [onNearBottom, ref]);

  return (
    <div style={{ overflowX: "hidden" }} ref={ref}>
      {children}
    </div>
  );
};

export default ScrollWatcher;
