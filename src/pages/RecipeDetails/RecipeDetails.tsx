import { fetchMealById } from "../../services/api"
import { useEffect, useState } from "react";
import css from "../../styles/RecipeDetails.module.css"
import { useParams } from "react-router";
function OneRecipe() {

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
  }, []);

 const arr = []
for (const smtsng of Object.entries(mealData)) {
  arr.push(smtsng)
}

  


  return (
    <div>
      {mealData.strMeal}
    </div>
  )
}

export default OneRecipe;