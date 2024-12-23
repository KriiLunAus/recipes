import { ReactNode } from "react";
import Navigation from "./Navigation";
import css from "../styles/Layout.module.css";

interface LayoutProps{
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={css.wrapper}>
      <Navigation />
      {children}
    </div>
  );
}

export default Layout;
