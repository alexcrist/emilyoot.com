import { useCallback, useMemo } from "react";
import { usePaginatedQuery } from "../../sanity/hooks/usePaginatedQuery.js";
import { urlForImage } from "../../sanity/lib/url-for-image.js";
import FadeInImage from "../FadeInImage.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import ScrollWatcher from "../ScrollWatcher.jsx";
import styles from "./LazyImageGrid.module.css";

const LazyImageGrid = ({ data }) => {
  const { items, fetchNextPage, isLoading } = usePaginatedQuery(data);

  const onNearBottom = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const images = useMemo(() => {
    return items.map((item) => {
      return {
        src: urlForImage(item.image).width(500).url(),
        alt: `${item.name} by Emily Oot`,
        link: `/work/${item.slug.current}`,
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
                        link={image.link}
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
                        link={image.link}
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
                  link={image.link}
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
