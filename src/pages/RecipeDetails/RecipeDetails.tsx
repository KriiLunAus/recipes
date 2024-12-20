import { fetchMealById } from "../../services/api"
import { useEffect, useState } from "react";
import css from "../../styles/RecipeDetails.module.css"
import { useParams } from "react-router-dom";
import { getIngredients } from "../../utils/utils";
function RecipeDetails({chosenRecipes, setChosenRecipes}) {

  const [mealData, setMealData] = useState([]);
  
  const recipeId = useParams().id;
  
 useEffect(() => {
    async function loadMeals() {
      try {
          const data = await fetchMealById(Number(recipeId));
          setMealData(data.meals[0])
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    }
    loadMeals();
  }, [recipeId]);

 const arr = []
for (const smtsng of Object.entries(mealData)) {
  arr.push(smtsng)
}


  return (
    <>
      {mealData.length !== 0 && <div>
          <h1>{mealData.strMeal}</h1>
        <div className={css.imageAndIngredientsWrapper}>
          <div><img src={mealData.strMealThumb} alt={mealData.strMeal} /></div>
        <ul>
            {getIngredients(mealData).map((ingredient) => (
              <li>
                <p>{ingredient.measure}</p>
                <p>{ingredient.ingredient}</p>
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