import { Children } from "react";
import styles from "../styles/LoadingScreen.module.scss";

const LoadingScreen = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.balls}>
        <div className={`${styles["ball"]} ${styles["one"]}`}></div>
        <div className={`${styles["ball"]} ${styles["two"]}`}></div>
        <div className={`${styles["ball"]} ${styles["three"]}`}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
