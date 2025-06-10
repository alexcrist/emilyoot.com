import _ from "lodash";
import { useEffect, useRef } from "react";

const THRESHOLD_PX = 100;

const ScrollWatcher = ({ children, onNearBottom }) => {
  const ref = useRef(null);

  useEffect(() => {
    const checkScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const distance = rect.bottom - window.innerHeight;
      if (distance < THRESHOLD_PX) {
        onNearBottom();
      }
    };
    const throttled = _.throttle(checkScroll, 200);
    window.addEventListener("scroll", throttled);
    throttled();
    return () => window.removeEventListener("scroll", throttled);
  }, [onNearBottom]);

  return (
    <div style={{ overflowX: "hidden" }} ref={ref}>
      {children}
    </div>
  );
};

export default ScrollWatcher;
