import { Link, useLocation } from "react-router-dom";
import css from "../styles/RecipeCard.module.css"
import { useEffect } from "react";
function RecipeCards({chosenArray = [], setChosenArray, standartArray = []}) {

  const location = useLocation();
  
  
  useEffect(() => {
    const chosenFromLocale = JSON.parse(localStorage.getItem("chosen"));
    setChosenArray(chosenFromLocale);
},[setChosenArray])

function onAdd(evt, recipe) {
  evt.preventDefault();
  evt.stopPropagation();
  const addedRecepies = [...chosenArray, recipe];
  setChosenArray(addedRecepies)
  localStorage.setItem("chosen", JSON.stringify(addedRecepies))
}

function onRemove(evt, recipe) {
  evt.preventDefault();
  evt.stopPropagation();
  const filteredRecipes = chosenArray.filter((item) => {
    return item.idMeal !== recipe.idMeal;
  })
  localStorage.setItem("chosen", JSON.stringify(filteredRecipes))
  setChosenArray(filteredRecipes)
}
    return (
    <ul className={css.mealList}>
      {location.pathname === "/" && standartArray.map((recipe, index) => (
        <Link  to={recipe.idMeal} key={index}>
          <img className={css.mealImage} src={recipe.strMealThumb} />
          <div className={css.infoWrapper}>
          <p className={css.name}>Name: {recipe.strMeal}</p>
          <p>Category: { recipe.strCategory }</p>
          <p>Country: {recipe.strArea}</p>  
          <button onClick={(evt) => {
              onAdd(evt, recipe);
          }}>Choose</button>
          </div>
        </Link>
      ))}
            
        {location.pathname === "/chosen" && chosenArray.map((recipe, index) => (
        <Link  to={recipe.idMeal} key={index}>
          <img className={css.mealImage} src={recipe.strMealThumb} />
          <div className={css.infoWrapper}>
          <p className={css.name}>Name: {recipe.strMeal}</p>
          <p>Category: { recipe.strCategory }</p>
          <p>Country: {recipe.strArea}</p>  
          <button onClick={(evt) => {
                onRemove(evt, recipe);
          }}>Remove</button>
          </div>
        </Link>
        ))}
      </ul>
  );
}

export default RecipeCards;
