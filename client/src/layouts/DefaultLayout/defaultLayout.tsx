import { Outlet } from "react-router-dom";
import styles from "./defaultLayout.module.css";

const DefaultLayout = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
