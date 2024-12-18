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
  }, [recipeId]);

 const arr = []
for (const smtsng of Object.entries(mealData)) {
  arr.push(smtsng)
}

function capitalizeWords(string) {
  return string.split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

  return (
    <>
      {mealData.length !== 0 && <div>
        <div className={css.imageAndIngredientsWrapper}>
        <div><img src={mealData.strMealThumb} alt={mealData.strMeal} /></div>
        <ul>
          <li><p>
            {mealData.strMeasure1}</p><p>{capitalizeWords(mealData.strIngredient1)}</p></li>
          <li><p>
            {mealData.strMeasure2}</p><p>{capitalizeWords(mealData.strIngredient2)}</p></li>
          <li><p>
            {mealData.strMeasure3}</p><p>{capitalizeWords(mealData.strIngredient3)}</p></li>
          <li><p>
            {mealData.strMeasure4}</p><p>{capitalizeWords(mealData.strIngredient4)}</p></li>
          <li><p>
            {mealData.strMeasure5}</p><p>{capitalizeWords(mealData.strIngredient5)}</p></li>
          <li><p>
            {mealData.strMeasure6}</p><p>{capitalizeWords(mealData.strIngredient6)}</p></li>
          <li><p>
            {mealData.strMeasure7}</p><p>{capitalizeWords(mealData.strIngredient7)}</p></li>
          <li><p>
            {mealData.strMeasure8}</p><p>{capitalizeWords(mealData.strIngredient8)}</p></li>
          <li><p>
            {mealData.strMeasure9}</p><p>{capitalizeWords(mealData.strIngredient9)}</p></li>
          <li><p>
            {mealData.strMeasure10}</p><p>{capitalizeWords(mealData.strIngredient10)}</p></li>
          <li><p>
            {mealData.strMeasur11}</p><p>{capitalizeWords(mealData.strIngredient11)}</p></li>
          <li><p>
            {mealData.strMeasure12}</p><p>{capitalizeWords(mealData.strIngredient12)}</p></li>
          <li><p>
            {mealData.strMeasure13}</p><p>{capitalizeWords(mealData.strIngredient13)}</p></li>
          <li><p>
            {mealData.strMeasure14}</p><p>{capitalizeWords(mealData.strIngredient14)}</p></li>
          <li><p>
            {mealData.strMeasure15}</p><p>{capitalizeWords(mealData.strIngredient15)}</p></li>
        </ul>
        </div>
        <h2 className={css.instructionsHeader}>Instructions:</h2>
        <p className={css.instructions}>{mealData.strInstructions}</p>
  
      </div>
    }
    </>
  )
}

export default OneRecipe;