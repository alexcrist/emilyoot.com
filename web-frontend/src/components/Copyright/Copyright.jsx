import styles from "./Copyright.module.css";

const Copyright = ({ showModal, modalCoords }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div
      className={styles.modal}
      style={{ top: modalCoords.top, left: modalCoords.left }}
    >
      This photo is Copyright © 2023 Emily Oot LLC. All rights reserved.
    </div>
  );
};

export default Copyright;
