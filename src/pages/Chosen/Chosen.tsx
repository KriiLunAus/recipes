import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import RecipeCards from "../../components/RecipeCards";
import css from "../../styles/Pagination.module.css"
import CSS from "../../styles/Chosen.module.css"
import { getIngredients, capitalizeWords } from "../../utils/utils";
import { Meal } from "../../types/types";

interface ChosenProps{
  chosenRecipes: Meal[],
  setChosenRecipes: React.Dispatch<React.SetStateAction<Meal[]>>;
}

interface Ingredient {
  ingredient: string | null;
  measure: string | null;
}


interface MergedIngredient {
  ingredient: string; 
  measures: string; 
}

type IngredientLists = Ingredient[][];


function Chosen({ chosenRecipes, setChosenRecipes }: ChosenProps) {

  const chosenFromLocale: Meal[]  = JSON.parse(localStorage.getItem("chosen") || "[]");

  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10;
  


  const displayedRecipes = chosenRecipes.slice(currentPage * perPage, (currentPage + 1) * perPage);
    
  
  function handlePageChange({ selected }:{selected: number}) {
    setCurrentPage(selected)
  }

  const ingredientsList = chosenFromLocale.map((recipe: Meal) => (
    getIngredients(recipe).filter((item => item.ingredient !== null && item.measure !== null))
  ))
  

  function mergeIngredients(ingredientLists: IngredientLists): MergedIngredient[] {
    const merged: Record<string, { ingredient: string; measures: string[] }> = {};

    ingredientLists.forEach(list => {
      list.forEach(item => {
        if (item.ingredient !== null && item.measure !== null) {
          const key = item.ingredient.toLowerCase();
          if (!merged[key]) {
            merged[key] = { ingredient: item.ingredient, measures: [] };
          }
          merged[key].measures.push(item.measure.trim());
        }
      });
    });

   
    

    return Object.values(merged).map(item => ({
        ingredient: capitalizeWords(item.ingredient),
        measures: item.measures.join(", ")
    }));
} console.log(mergeIngredients(ingredientsList));

    return (<>
      {chosenFromLocale.length === 0 && <h2 className={CSS.noRecipes}>There is no recipes. <Link className={CSS.noRecipesLink} to="/">Chose something</Link></h2>}
      <RecipeCards chosenArray={displayedRecipes} setChosenArray={setChosenRecipes} />
      {chosenFromLocale.length !== 0 &&
        <ReactPaginate
            previousLabel="<<<"
            nextLabel=">>>"
            breakLabel="..."
            breakClassName={css.pageitem}
            breakLinkClassName={css.pageLink}
            pageCount={Math.ceil(chosenRecipes.length/perPage)}
            pageRangeDisplayed={3}
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
      <h2>List of ingridients</h2>
      <ul className={CSS.ingredientList}>
        {mergeIngredients(ingredientsList).map((ingredient) => {
          if (ingredient.ingredient !== "") {   
            return (
              <li>
              <p>{ingredient.ingredient}</p>
              <p>{ingredient.measures}</p>
            </li>
          )
        }
        })}
      </ul>
    </>);
}

export default Chosen;