import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchMeals } from "../../services/api";
import css from "../../styles/AllRecipes.module.css"

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
        <Link  to={meal.idMeal} key={index}>
          <img className={css.mealImage} src={meal.strMealThumb} />
          <div className={css.infoWrapper}>
          <p className={css.name}>Name: {meal.strMeal}</p>
          <p>Category: { meal.strCategory }</p>
          <p>Country: { meal.strArea }</p>
          </div>
        </Link>
        ))}
      </ul>
    </>
  )
}

export default AllMeals;