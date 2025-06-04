import { useState } from "react";
import { obfuscate } from "../../util/obfuscate";
import styles from "./PasswordProtector.module.css";

const PasswordProtector = ({ children }) => {
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [didGuessWrong, setDidGuessWrong] = useState(false);
  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if ("9cb3730174e79e7755aa2c8722ad05b0" === obfuscate(value)) {
        setIsPasswordCorrect(true);
      } else {
        setDidGuessWrong(true);
      }
    }, 600);
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
