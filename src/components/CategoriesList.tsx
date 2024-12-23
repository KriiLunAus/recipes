import { useEffect, useState } from "react";
import { fetchMealsCategories } from "../services/api";
import css from "../styles/CategoriesList.module.css";
import { fetchMealsByCategory } from "../services/api";
import clsx from "clsx";
import { Meal } from "../types/types";

interface CategoriesList{
    setCategorysedCollection: React.Dispatch<React.SetStateAction<Meal[]>>
}
function CategoriesList({ setCategorysedCollection }: CategoriesList) {
    const [categories, setCategories] = useState<Meal[]>([]);
    const [inputCategory, setInputCategory] = useState<string>("");


    useEffect(() => {
        async function getCategories() {
            try {
                const data = await fetchMealsCategories();
                setCategories(data);
            } catch (error) {
                throw new Error((error as Error).message);
            }
        }
        getCategories()

        async function loadMealsByCategory(category: string) {
      try {
          const data = await fetchMealsByCategory(category); 
          
          setCategorysedCollection(data.meals)
      } catch (error) {
        throw new Error((error as Error).message)
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
                    onClick={(evt: React.MouseEvent<HTMLElement>) => {
                    setInputCategory(evt.currentTarget.textContent ? evt.currentTarget.textContent : "");
                    }}>
                    {category.strCategory}
                </li>
            ))}
            
        </ul>
    </div>);
}

export default CategoriesList;