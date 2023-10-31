import { Outlet } from "react-router-dom";
import styles from "./defaultLayout.module.css";
import Sidebar from "@/components/Sidebar";

type IProps = {
  active?: boolean;
  isAdmin?: boolean;
};

const DefaultLayout = ({ active = false, isAdmin = false }: IProps) => {
  return (
    <div className={styles.container}>
      <Sidebar active={active} isAdmin={isAdmin} />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
