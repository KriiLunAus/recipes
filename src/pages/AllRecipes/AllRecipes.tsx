import { useEffect, useState } from "react";
import { fetchMeals } from "../../services/api";
import Search from "../../components/Search";
import CategoriesList from "../../components/CategoriesList"
import RecipeCards from "../../components/RecipeCards";
import ReactPaginate from "react-paginate";
import css from "../../styles/AllRecipes.module.css"
function AllRecipes({chosenRecipes, setChosenRecipes}) {

  const [allRecipesCollection, setAllRecipesCollection] = useState([]);
  const [searchedCollection, setSearchedCollection] = useState([]);
  const [categorysedCollection, setCategorysedCollection] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10;
  

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

  function handlePageChange({selected}) {
    setCurrentPage(selected)
  }

  const displayedRecipes = isSearch
    ? searchedCollection.slice(currentPage * perPage, (currentPage + 1) * perPage)
    : categorysedCollection.length
    ? categorysedCollection.slice(currentPage * perPage, (currentPage + 1) * perPage)
    : allRecipesCollection.slice(currentPage * perPage, (currentPage + 1) * perPage);
  console.log(displayedRecipes);
  
  
  return (
    <>
      
      <CategoriesList setCategorysedCollection={setCategorysedCollection} />

      {categorysedCollection.length === 0 && <Search setIsSearch={setIsSearch} recipes={allRecipesCollection} setCollection={setSearchedCollection} />}
      {categorysedCollection.length !== 0 && <Search setIsSearch={setIsSearch} recipes={categorysedCollection} setCollection={setSearchedCollection} />}
      {!isSearch && categorysedCollection.length === 0 && <RecipeCards chosenArray ={chosenRecipes} setChosenArray={setChosenRecipes} standartArray={displayedRecipes}/>}

      {isSearch && searchedCollection.length === 0 && (<div>No recipes found.</div>)}
      {isSearch && <RecipeCards chosenArray ={chosenRecipes} setChosenArray={setChosenRecipes} standartArray={displayedRecipes}/>}
      {!isSearch && categorysedCollection.length !== 0 && <RecipeCards chosenArray={chosenRecipes} setChosenArray={setChosenRecipes} standartArray={displayedRecipes} />}
      <ReactPaginate
            previousLabel="<<<"
            nextLabel=">>>"
            breakLabel="..."
            breakClassName={css.pageitem}
            breakLinkClassName={css.pageLink}
            pageCount={Math.ceil( isSearch
            ? searchedCollection.length / perPage
            : categorysedCollection.length
            ? categorysedCollection.length / perPage
            : allRecipesCollection.length / perPage)}
            pageRangeDisplayed={7}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName={css.paginationContainer}
            pageClassName={css.pageItem}
            pageLinkClassName={css.pageLink}
            previousClassName={css.pageItem}
            previousLinkClassName={css.pageLink}
            nextClassName={css.pageItem}
            nextLinkClassName={css.pageLink}
            activeClassName={css.active}
            // eslint-disable-next-line no-unused-vars
            hrefBuilder={(page, pageCount, selected) =>
              page >= 1 && page <= pageCount ? `/page/${page}` : '#'
            }
            hrefAllControls
            forcePage={currentPage}
         
          />
    </>
  )
}

export default AllRecipes;


