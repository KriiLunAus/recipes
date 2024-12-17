import { useEffect, useState } from "react";
import { fetchMealsCategories } from "../services/api";

function CategoriesList() {
    const [categories, setCategories] = useState([]);
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
    },[])

    return (<>
    
        <details>
            <summary>Categories</summary>
            <ul>
            {categories.map((category, index) => (
                <li key={index}>{category.strCategory}</li>
            ))}
            </ul>
        </details>
            
    </>);
}

export default CategoriesList;