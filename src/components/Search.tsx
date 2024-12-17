import css from "../styles/Search.module.css"
import { useCallback } from "react";
import { debounce } from "lodash";

function Search({ recipes, setCollection, setIsSearch }) {
        const debouncedSearch = useCallback(
            debounce((value) => {
                if (value === "") {
                    setIsSearch(false);
                    setCollection([]);
                } else {
                    const searchedRecipes = recipes.filter((recipe) =>
                        recipe.strMeal.toLowerCase().includes(value.toLowerCase())
                    );
                    setCollection(searchedRecipes);
                    setIsSearch(true);
                }
            }, 500), 
            [recipes, setCollection, setIsSearch]
        );

        function onSearch(evt) {
            const value = evt.target.value;
            debouncedSearch(value);
        }
        return (<div>
            <label>
                <input className={css.searchInput} type="text" name="searchRecipe" id="searchRecipe" placeholder="Search recipe" onInput={onSearch} autoComplete="off" />
            </label>
        </div>)
}

export default Search;