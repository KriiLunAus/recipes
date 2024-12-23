import { useEffect, useState } from "react";
import { fetchMeals } from "../../services/api";
import Search from "../../components/Search";
import CategoriesList from "../../components/CategoriesList"
import RecipeCards from "../../components/RecipeCards";
import ReactPaginate from "react-paginate";
import css from "../../styles/Pagination.module.css"
import CSS from "../../styles/AllRecipes.module.css"
import { Meal } from "../../types/types";

interface AllRecipesProps{
  chosenRecipes: Meal[],
  setChosenRecipes: React.Dispatch<React.SetStateAction<Meal[]>>;
}

function AllRecipes({chosenRecipes, setChosenRecipes}:AllRecipesProps) {

  const [allRecipesCollection, setAllRecipesCollection] = useState<Meal[]>([]);
  const [searchedCollection, setSearchedCollection] = useState<Meal[]>([]);
  const [categorysedCollection, setCategorysedCollection] = useState<Meal[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const perPage = 10;
  


  useEffect(() => {
    
    function loadMeals() {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const allRecipes = await fetchMeals();
          setAllRecipesCollection(allRecipes);
        } catch (error) {
          console.error("Error fetching meals:", error);
        } finally {
          setIsSearch(false);
          setIsLoading(false);
        }
      },500)
    }

    loadMeals();
  }, []);

  function handlePageChange({selected}:{selected: number}) {
    setCurrentPage(selected)
  }

  const displayedRecipes = isSearch
    ? searchedCollection.slice(currentPage * perPage, (currentPage + 1) * perPage)
    : categorysedCollection.length
    ? categorysedCollection.slice(currentPage * perPage, (currentPage + 1) * perPage)
    : allRecipesCollection.slice(currentPage * perPage, (currentPage + 1) * perPage);
  
  return (
    <>
      
      <CategoriesList setCategorysedCollection={setCategorysedCollection} />
      {categorysedCollection.length === 0 && <Search setIsSearch={setIsSearch} recipes={allRecipesCollection} setCollection={setSearchedCollection} />}
      {categorysedCollection.length !== 0 && <Search setIsSearch={setIsSearch} recipes={categorysedCollection} setCollection={setSearchedCollection} />}
      {isLoading && <div className={CSS.loader}></div>}
      {!isSearch && categorysedCollection.length === 0 && <RecipeCards chosenArray ={chosenRecipes} setChosenArray={setChosenRecipes} standartArray={displayedRecipes}/>}

      {isSearch && searchedCollection.length === 0 && (<div>No recipes found.</div>)}
      {isSearch && <RecipeCards chosenArray ={chosenRecipes} setChosenArray={setChosenRecipes} standartArray={displayedRecipes}/>}
      {!isSearch && categorysedCollection.length !== 0 && <RecipeCards chosenArray={chosenRecipes} setChosenArray={setChosenRecipes} standartArray={displayedRecipes} />}
      {!isLoading && <ReactPaginate
            previousLabel="<<<"
            nextLabel=">>>"
            breakLabel="..."
            breakClassName={css.pageitem}
            breakLinkClassName={css.pageLink}
            pageCount={Math.ceil(isSearch
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
            hrefBuilder={(page, pageCount) =>
              page >= 1 && page <= pageCount ? `/page/${page}` : '#'
            }
            hrefAllControls
            forcePage={currentPage}
         
          />}
    </>
  )
}

export default AllRecipes;


