import Navigation from "./Navigation";
import css from "../styles/Layout.module.css";
function Layout({ children }) {
  return (
    <div className={css.wrapper}>
      <Navigation />
      {children}
    </div>
  );
}

export default Layout;
