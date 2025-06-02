import { useEffect, useRef, useState } from "react";

const FadeInImage = ({ ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const img = ref.current;
    if (!img) {
      return;
    }
    if (img.complete) {
      requestAnimationFrame(() => setIsLoaded(true));
    }
    const onLoad = () => requestAnimationFrame(() => setIsLoaded(true));
    img.addEventListener("load", onLoad);
    return () => img.removeEventListener("load", onLoad);
  }, []);
  return <img ref={ref} style={{ opacity: isLoaded ? 1 : 0 }} {...props} />;
};

export default FadeInImage;
