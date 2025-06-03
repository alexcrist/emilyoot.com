import { useEffect, useRef, useState } from "react";

// TODO: disable image right clicking, display copyright thing
//   <meta
// name="image_protection_blurb"
// content="This photo is Copyright © 2023 Emily Oot LLC. All rights reserved."
// />

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
