import { fetchMealById } from "../../services/api"
import { useEffect, useState } from "react";
import css from "../../styles/RecipeDetails.module.css"
import { useParams } from "react-router-dom";
import { capitalizeWords, getIngredients } from "../../utils/utils";
import { Meal } from "../../types/types";

interface RecipeDetailsProps{
  chosenRecipes: Meal[],
  setChosenRecipes: React.Dispatch<React.SetStateAction<Meal[]>>;
}

function RecipeDetails({ chosenRecipes, setChosenRecipes }:RecipeDetailsProps) {

  const [mealData, setMealData] = useState<Meal | null>(null);
  
  const recipeId = useParams<{id: string}>().id;
  
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

  return (
    <>
      {mealData !== null && <div>
          <h1>{mealData.strMeal}</h1>
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
          <button onClick={(evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            setChosenRecipes([...chosenRecipes, mealData])
          }}>Choose</button>
          </div>
        <h2 className={css.instructionsHeader}>Instructions:</h2>
        <p className={css.instructions}>{mealData.strInstructions}</p>
  
      </div>
    }
    </>
  )
}

export default RecipeDetails;