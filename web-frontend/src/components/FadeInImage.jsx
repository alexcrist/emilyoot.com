import { useEffect, useRef, useState } from "react";
import { useCopyright } from "./Copyright/useCopyright.jsx";

const FadeInImage = ({ link, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { copyrightElement, onRightClick } = useCopyright();

  // Fade in image
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

  return (
    <>
      <a href={link}>
        <img
          ref={ref}
          style={{ opacity: isLoaded ? 1 : 0 }}
          onContextMenu={onRightClick}
          {...props}
        />
      </a>
      {copyrightElement}
    </>
  );
};

export default FadeInImage;
