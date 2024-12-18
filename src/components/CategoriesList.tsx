import { useEffect, useState } from "react";
import { fetchMealsCategories } from "../services/api";
import css from "../styles/CategoriesList.module.css";
import { fetchMealsByCategory } from "../services/api";
import clsx from "clsx";

function CategoriesList({setCategorysedCollection}) {
    const [categories, setCategories] = useState([]);
    const [inputCategory, setInputCategory] = useState("");
    useEffect(() => {
        async function getCategories() {
            try {
                const data = await fetchMealsCategories();
                setCategories(data);
            } catch (error) {
                throw new Error(error);
            }
        }
        getCategories()

        async function loadMealsByCategory(category) {
      try {
        const data = await fetchMealsByCategory(category);
          setCategorysedCollection(data.meals)
      } catch (error) {
        throw new Error(error)
      }
        }
        
    if (inputCategory !== "") {
        loadMealsByCategory(inputCategory);
        }
        
    }, [ setCategorysedCollection, inputCategory])

    
    return (<div className={css.categoriesWrapper}>
        <h2>Categories:</h2>
        <ul> 
            <li
                className={clsx(inputCategory === "" ? css.chosenCategory : "")}
                onClick={() => {
                setCategorysedCollection([]);
                setInputCategory("")
            }}>All</li>

            {categories.map((category, index) => (
                <li 
                    className={clsx(inputCategory === category.strCategory ? css.chosenCategory : "")}
                    key={index}
                    onClick={(evt) => {
                    setInputCategory(evt.target.textContent);
                    }}>
                    {category.strCategory}
                </li>
            ))}
            
        </ul>
    </div>);
}

export default CategoriesList;