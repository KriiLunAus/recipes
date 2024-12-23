import { Link, useLocation } from "react-router-dom";
import css from "../styles/RecipeCards.module.css"
import { useEffect } from "react";
import { Meal } from "../types/types";

interface RecipeCardsProps {
  chosenArray: Meal[] | [],
  setChosenArray: React.Dispatch<React.SetStateAction<Meal[]>>,
  standartArray?: Meal[],
}

function RecipeCards({chosenArray = [], setChosenArray, standartArray = []}: RecipeCardsProps) {

  const location = useLocation();
  
  
  useEffect(() => {
    const chosenFromLocale = localStorage.getItem("chosen");
     if (chosenFromLocale) {
      const parsedData: Meal[] = JSON.parse(chosenFromLocale);
      setChosenArray(parsedData);
    }
},[setChosenArray])

  
  function onChange(evt: React.MouseEvent<HTMLButtonElement>, recipe: Meal, action: "add" | "remove") {
    evt.preventDefault();
    evt.stopPropagation();
    let recipes: Meal[] = [];
    if (action === "add") {
      recipes = [...chosenArray, recipe];
      setChosenArray(recipes)
    } else if(action === "remove"){
      recipes = chosenArray.filter((item) => {
        return item.idMeal !== recipe.idMeal;
      })
      setChosenArray(recipes)
    }
  localStorage.setItem("chosen", JSON.stringify(recipes))
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
          <button className={css.addButton} onClick={(evt) => {
              onChange(evt, recipe, "add");
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
          <button className={css.removeButton} onClick={(evt) => {
                onChange(evt, recipe, "remove");
          }}>Remove</button>
          </div>
        </Link>
        ))}
      </ul>
  );
}

export default RecipeCards;
