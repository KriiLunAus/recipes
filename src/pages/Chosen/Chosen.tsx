import { Link } from "react-router-dom";
import RecipeCards from "../../components/RecipeCards";
function Chosen({ chosenRecipes, setChosenRecipes }) {

    const chosenFromLocale = JSON.parse(localStorage.getItem("chosen"));
console.log(chosenFromLocale);


    return (<>
      {chosenFromLocale.length === 0 && <div>There is no recepies. <Link to="/">Chose something</Link></div>}
      <RecipeCards chosenArray ={chosenRecipes} setChosenArray={setChosenRecipes}/>
    </>);
}

export default Chosen;