import { useEffect, useState } from "react";
import { fetchMeals } from "../../services/api";
import css from "../../styles/AllMeals.module.css"

function AllMeals() {

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function loadMeals() {
      try {
        const mealData = await fetchMeals();
        setMeals(mealData);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    }
    loadMeals();
  }, []);
  
  return (
    <>
      <ul className={css.mealList}>
        {meals.map((meal, index) => (
        <li key={index}>
          <img className={css.mealImage} src={meal.strMealThumb} />
          <div>
          <p>Name: {meal.strMeal}</p>
          <p>Category: { meal.strCategory }</p>
          <p>Country: { meal.strArea }</p>
          </div>
        </li>
        ))}
      </ul>
    </>
  )
}

export default AllMeals;