import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchMeals } from "../../services/api";
import css from "../../styles/AllRecipes.module.css"
import Search from "../../components/Search";
import CategoriesList from "../../components/CategoriesList"

function AllMeals() {

  const [allRecipesCollection, setAllRecipesCollection] = useState([]);
  const [searchedCollection, setSearchedCollection] = useState([]);
  const [categorysedCollection, setCategorysedCollection] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  
  useEffect(() => {
    async function loadMeals() {
      try {
        const allRecipes = await fetchMeals();
        setAllRecipesCollection(allRecipes);
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
      
      <CategoriesList setCategorysedCollection={setCategorysedCollection} />

      <Search setIsSearch={setIsSearch} recipes={allRecipesCollection} setCollection={ setSearchedCollection} />
      {!isSearch && categorysedCollection.length === 0 && renderRecipesCards(allRecipesCollection)}

      {isSearch && searchedCollection.length === 0 && (<div>No recipes found.</div>)}
      {isSearch && renderRecipesCards(searchedCollection)}
      {!isSearch && categorysedCollection.length !== 0 && renderRecipesCards(categorysedCollection)}
    </>
  )
}

export default AllMeals;


function renderRecipesCards(array) {
  return (
    <ul className={css.mealList}>
        {array.map((recipe, index) => (
        <Link  to={recipe.idMeal} key={index}>
          <img className={css.mealImage} src={recipe.strMealThumb} />
          <div className={css.infoWrapper}>
          <p className={css.name}>Name: {recipe.strMeal}</p>
          <p>Category: { recipe.strCategory }</p>
          <p>Country: { recipe.strArea }</p>
          </div>
        </Link>
        ))}
      </ul>
  )
}