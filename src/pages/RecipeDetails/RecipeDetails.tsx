import { fetchMealById } from "../../services/api"
import { useEffect, useState } from "react";
import css from "../../styles/RecipeDetails.module.css"
import { useParams } from "react-router";
function OneRecipe() {

  const [mealData, setMealData] = useState([]);
  console.log(mealData);
  
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

function capitalizeWords(string) {
  return string.split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}


  return (
    <>
    {mealData.length !== 0 && <div>
        <div></div>
        <ul>
          <li>{mealData.strMeasure1} {capitalizeWords(mealData.strIngredient1)}</li>
          <li>{mealData.strMeasure2} {capitalizeWords(mealData.strIngredient2)}</li>
          <li>{mealData.strMeasure3} {capitalizeWords(mealData.strIngredient3)}</li>
          <li>{mealData.strMeasure4} {capitalizeWords(mealData.strIngredient4)}</li>
          <li>{mealData.strMeasure5} {capitalizeWords(mealData.strIngredient5)}</li>
          <li>{mealData.strMeasure6} {capitalizeWords(mealData.strIngredient6)}</li>
          <li>{mealData.strMeasure7} {capitalizeWords(mealData.strIngredient7)}</li>
          <li>{mealData.strMeasure8} {capitalizeWords(mealData.strIngredient8)}</li>
          <li>{mealData.strMeasure9} {capitalizeWords(mealData.strIngredient9)}</li>
          <li>{mealData.strMeasure10} {capitalizeWords(mealData.strIngredient10)}</li>
          <li>{mealData.strMeasur11} {capitalizeWords(mealData.strIngredient11)}</li>
          <li>{mealData.strMeasure12} {capitalizeWords(mealData.strIngredient12)}</li>
          <li>{mealData.strMeasure13} {capitalizeWords(mealData.strIngredient13)}</li>
          <li>{mealData.strMeasure14} {capitalizeWords(mealData.strIngredient14)}</li>
          <li>{mealData.strMeasure15} {capitalizeWords(mealData.strIngredient15)}</li>
        </ul>
        <h2>Instructions:</h2>
        <p>{mealData.strInstructions}</p>
  
      </div>
    }
    </>
  )
}

export default OneRecipe;