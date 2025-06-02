import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          border: "4px solid #ccc",
          borderTop: "4px solid #333",
          borderRadius: "50%",
          margin: "20px",
          animation: `${styles.spin} 1s linear infinite`,
          transition: "all 300ms",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
