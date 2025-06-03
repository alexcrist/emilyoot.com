import { useCallback, useMemo } from "react";
import { usePaginatedQuery } from "../../sanity/hooks/usePaginatedQuery.js";
import { urlForImage } from "../../sanity/lib/url-for-image.js";
import FadeInImage from "../FadeInImage.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import ScrollWatcher from "../ScrollWatcher.jsx";
import styles from "./LazyImageGrid.module.css";

const LazyImageGrid = () => {
  const { items, fetchNextPage, isLoading } = usePaginatedQuery("works");

  const onNearBottom = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const images = useMemo(() => {
    return items.map((work) => {
      return {
        src: urlForImage(work.image).width(500).url(),
        alt: `${work.name} by Emily Oot`,
      };
    });
  }, [items]);

  const threeColumnLayout = useMemo(() => {
    const threeColumnLayout = [[], [], []];
    for (let i = 0; i < images.length; i++) {
      const columnIndex = i % 3;
      threeColumnLayout[columnIndex].push(images[i]);
    }
    return threeColumnLayout;
  }, [images]);

  const twoColumnLayout = useMemo(() => {
    const twoColumnLayout = [[], []];
    for (let i = 0; i < images.length; i++) {
      const columnIndex = i % 2;
      twoColumnLayout[columnIndex].push(images[i]);
    }
    return twoColumnLayout;
  }, [images]);

  return (
    <>
      <ScrollWatcher onNearBottom={onNearBottom}>
        <div className={styles.gridContainer}>
          <div className={`${styles.grid} ${styles.gridThreeColumn}`}>
            {threeColumnLayout.map((column, colIndex) => {
              return (
                <div className={styles.column} key={`three-col-${colIndex}`}>
                  {column.map((image, imgIndex) => {
                    return (
                      <FadeInImage
                        key={`three-col-img-${colIndex}-${imgIndex}`}
                        className={styles.image}
                        src={image.src}
                        alt={image.alt}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className={`${styles.grid} ${styles.gridTwoColumn}`}>
            {twoColumnLayout.map((column, colIndex) => {
              return (
                <div className={styles.column} key={`two-col-${colIndex}`}>
                  {column.map((image, imgIndex) => {
                    return (
                      <FadeInImage
                        key={`two-col-img-${colIndex}-${imgIndex}`}
                        className={styles.image}
                        src={image.src}
                        alt={image.alt}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className={`${styles.grid} ${styles.gridOneColumn}`}>
            {images.map((image, imgIndex) => {
              return (
                <FadeInImage
                  key={`one-col-img-${imgIndex}`}
                  className={styles.image}
                  src={image.src}
                  alt={image.alt}
                />
              );
            })}
          </div>
        </div>
      </ScrollWatcher>
      {isLoading ? <LoadingSpinner /> : null}
    </>
  );
};

export default LazyImageGrid;
