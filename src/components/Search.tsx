import css from "../styles/Search.module.css"
import { debounce } from "lodash";
import { Meal } from "../types/types";

interface SearchProps{
    recipes: Meal[],
    setCollection: React.Dispatch<React.SetStateAction<Meal[]>>,
    setIsSearch: React.Dispatch<React.SetStateAction<boolean>>
}

function Search({ recipes, setCollection, setIsSearch }: SearchProps) {    
    
    const handleSearch = (value: string) => {
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
    };

    const debouncedSearch = debounce(handleSearch, 500);
    
    
        function onSearch(evt: React.KeyboardEvent<HTMLInputElement>) {
            const value = evt.currentTarget.value;
            debouncedSearch(value);
        }
    
        return (<div>
            <label>
                <input className={css.searchInput} type="text" name="searchRecipe" id="searchRecipe" placeholder="Search recipe" onInput={onSearch} autoComplete="off" />
            </label>
        </div>)
}

export default Search;