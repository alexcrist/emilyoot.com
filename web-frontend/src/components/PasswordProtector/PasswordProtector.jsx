import { useState } from "react";
import styles from "./PasswordProtector.module.css";

const PasswordProtector = ({ children }) => {
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [didGuessWrong, setDidGuessWrong] = useState(false);
  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const res = await fetch(
      "https://emilyoot-com.vercel.app/api/checkPrintsPassword",
      {
        method: "POST",
        body: JSON.stringify({ password: value }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    const { isCorrect } = await res.json();
    setIsLoading(false);
    if (isCorrect) {
      setIsPasswordCorrect(true);
    } else {
      setDidGuessWrong(true);
    }
  };
  let statusText = "A password is required to view this page.";
  if (isLoading) {
    statusText = "Loading...";
  } else if (didGuessWrong) {
    statusText = "Incorrect password.";
  }
  if (isPasswordCorrect) {
    return children;
  }

  return (
    <div className={styles.container}>
      <div className={styles.privatePage}>Private page</div>
      <form onSubmit={onSubmit}>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            disabled={isLoading}
            type="password"
            value={value}
            onChange={onChange}
          />
          <input disabled={isLoading} type="submit" />
        </div>
      </form>
      <div className={styles.status}>{statusText}</div>
    </div>
  );
};

export default PasswordProtector;
