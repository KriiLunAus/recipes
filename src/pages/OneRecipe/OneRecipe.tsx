import { fetchMealById } from "../../services/api"
import { useEffect, useState } from "react";
import css from "../../styles/OneRecipe.module.css"
function OneRecipe() {

    const [mealData, setMealData] = useState([]);


 useEffect(() => {
    async function loadMeals() {
      try {
          const data = await fetchMealById(52850);
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
    <>
      <ul className={css.oneMeal}>
        { arr.map((entrie) => (
          <li>{entrie[1]}
          </li>
        ))}
    </ul>
    </>
  )
}

export default OneRecipe;