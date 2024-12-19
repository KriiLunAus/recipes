import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import RecipeCards from "../../components/RecipeCards";
import css from "../../styles/Pagination.module.css"
import CSS from "../../styles/Chosen.module.css"

function Chosen({ chosenRecipes, setChosenRecipes }) {

    const chosenFromLocale = JSON.parse(localStorage.getItem("chosen"));

    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 10;


  const displayedRecipes = chosenRecipes.slice(currentPage * perPage, (currentPage + 1) * perPage);
    
  
  function handlePageChange({ selected }) {
    setCurrentPage(selected)
  }

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
            hrefBuilder={(page, pageCount, selected) =>
              page >= 1 && page <= pageCount ? `/page/${page}` : '#'
            }
            hrefAllControls
            forcePage={currentPage}
         
          />}
    </>);
}

export default Chosen;