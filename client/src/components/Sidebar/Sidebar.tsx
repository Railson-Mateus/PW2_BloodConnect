import styles from "./Sidebar.module.css";

type ISidebar = {
  active: boolean;
  isAdmin?: boolean;
};

const Sidebar = ({ active, isAdmin = false }: ISidebar) => {
  return (
    <div className={styles.container}>
      {active && <h1 className={styles.title}>Sidebar {isAdmin && "Admin"}</h1>}
    </div>
  );
};

export default Sidebar;
