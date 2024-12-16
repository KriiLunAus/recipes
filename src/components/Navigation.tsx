import { NavLink } from "react-router";

function Navigation() {
    return (<>
        <NavLink to="/">All Recipes</NavLink>
        <NavLink to="/cart">Cart</NavLink>
    </>);
}

export default Navigation;