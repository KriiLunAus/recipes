import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "../styles/Navigation.module.css"

const getNavLinkClass = ({ isActive }) => {
   return clsx(css.link, isActive && css.active)
}


function Navigation() {
    return (
    <div className={css.navigationWrapper}>
        <nav>
         <NavLink className={getNavLinkClass} to="/">All Recipes</NavLink>
         <NavLink className={getNavLinkClass} to="/chosen">Chosen</NavLink>
        </nav>
    </div>
    );
}

export default Navigation;