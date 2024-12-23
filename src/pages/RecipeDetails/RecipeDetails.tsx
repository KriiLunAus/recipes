import { fetchMealById } from "../../services/api"
import { useEffect, useState } from "react";
import css from "../../styles/RecipeDetails.module.css"
import { Link, useLocation, useParams } from "react-router-dom";
import { capitalizeWords, getIngredients } from "../../utils/utils";
import { Meal } from "../../types/types";

interface RecipeDetailsProps{
  chosenRecipes: Meal[],
  setChosenRecipes: React.Dispatch<React.SetStateAction<Meal[]>>;
}

function RecipeDetails({ chosenRecipes, setChosenRecipes }:RecipeDetailsProps) {

  const [mealData, setMealData] = useState<Meal | null>(null);
  
  const recipeId = useParams<{id: string}>().id;
  const location = useLocation();
  

 useEffect(() => {
    async function loadMeals() {
      try {
          const data = await fetchMealById(Number(recipeId));
          setMealData(data)
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    }
    loadMeals();
 }, [recipeId]);
  
  
   function onChange(evt: React.MouseEvent<HTMLButtonElement>, recipe: Meal, action: "add" | "remove") {
    evt.preventDefault();
    evt.stopPropagation();
    let recipes: Meal[] = [];
    if (action === "add") {
      recipes = [...chosenRecipes, recipe];
      setChosenRecipes(recipes)
    } else if(action === "remove"){
      recipes = chosenRecipes.filter((item) => {
        return item.idMeal !== recipe.idMeal;
      })
      setChosenRecipes(recipes)
    }
  localStorage.setItem("chosen", JSON.stringify(recipes))
  }
  

  return (
    <>
      {mealData !== null && <div>
        {location.pathname !== `/${recipeId}` &&<Link className={css.goBack} to={"/chosen"}>Go Back</Link>}
        {location.pathname === `/${recipeId}` && <Link className={css.goBack} to={"/"}>Go Back</Link>}

        
        <div className={css.headerWrapper}>
          <h1 className={css.header}>{mealData.strMeal}</h1>
        </div>
        <div className={css.imageAndIngredientsWrapper}>
          <div><img src={mealData.strMealThumb} alt={mealData.strMeal} /></div>
        <ul>
            {getIngredients(mealData).map((ingredient, index) => (
              <li key={index}>
                <p>{ingredient.measure}</p>
                <p>{capitalizeWords(ingredient.ingredient || "")}</p>
              </li>
         ))}
          </ul>
          <div className={css.btnWrapper}>
            <button className={css.addBtn} onClick={(evt) => {
              onChange(evt, mealData, "add")
            }}>Choose</button>

            <button className={css.removeBtn} onClick={(evt) => {
              onChange(evt, mealData, "remove")
            }}>Remove from Chosen</button>
          </div>
        </div>
        <h2 className={css.instructionsHeader}>Instructions:</h2>
        <p className={css.instructions}>{mealData.strInstructions}</p>
  
      </div>
    }
    </>
  )
}

export default RecipeDetails;