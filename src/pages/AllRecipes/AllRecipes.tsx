import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchMeals } from "../../services/api";
import css from "../../styles/AllRecipes.module.css"
import Search from "../../components/Search";

function AllMeals() {

  const [recipes, setRecipes] = useState([]);
  const [searchedColection, setSearchedColection] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  
  useEffect(() => {
    async function loadMeals() {
      try {
        const allRecipes = await fetchMeals();
        setRecipes(allRecipes);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setIsSearch(false);
      }
    }
    loadMeals();
  }, []);

  return (
    <>
      <Search setIsSearch={setIsSearch} recipes={recipes} setCollection={ setSearchedColection} />
      {!isSearch &&<ul className={css.mealList}>
        {recipes.map((recipe, index) => (
        <Link  to={recipe.idMeal} key={index}>
          <img className={css.mealImage} src={recipe.strMealThumb} />
          <div className={css.infoWrapper}>
          <p className={css.name}>Name: {recipe.strMeal}</p>
          <p>Category: { recipe.strCategory }</p>
          <p>Country: { recipe.strArea }</p>
          </div>
        </Link>
        ))}
      </ul>}


      {isSearch && <ul className={css.mealList}>
        {searchedColection.map((recipe, index) => (
        <Link  to={recipe.idMeal} key={index}>
          <img className={css.mealImage} src={recipe.strMealThumb} />
          <div className={css.infoWrapper}>
          <p className={css.name}>Name: {recipe.strMeal}</p>
          <p>Category: { recipe.strCategory }</p>
          <p>Country: { recipe.strArea }</p>
          </div>
        </Link>
        ))}
      </ul>}
    </>
  )
}

export default AllMeals;