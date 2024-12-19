import { useEffect, useState } from "react";
import { fetchMeals } from "../../services/api";
import Search from "../../components/Search";
import CategoriesList from "../../components/CategoriesList"
import RecipeCards from "../../components/RecipeCards";
function AllRecipes({chosenRecipes, setChosenRecipes}) {

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

      {categorysedCollection.length === 0 && <Search setIsSearch={setIsSearch} recipes={allRecipesCollection} setCollection={setSearchedCollection} />}
      {categorysedCollection.length !== 0 && <Search setIsSearch={setIsSearch} recipes={categorysedCollection} setCollection={setSearchedCollection} />}
      {!isSearch && categorysedCollection.length === 0 && <RecipeCards chosenArray ={chosenRecipes} setChosenArray={setChosenRecipes} standartArray={allRecipesCollection}/>}

      {isSearch && searchedCollection.length === 0 && (<div>No recipes found.</div>)}
      {isSearch && <RecipeCards chosenArray ={chosenRecipes} setChosenArray={setChosenRecipes} standartArray={searchedCollection}/>}
      {!isSearch && categorysedCollection.length !== 0 && <RecipeCards chosenArray ={chosenRecipes} setChosenArray={setChosenRecipes} standartArray={categorysedCollection}/>}
    </>
  )
}

export default AllRecipes;


