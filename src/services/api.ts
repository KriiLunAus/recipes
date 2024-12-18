import axios from "axios"

export async function fetchMeals() {
    let meals;
 try {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const mealResponses = await Promise.all(
      alphabet.map((letter) => {  
      return  axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      })
    );
    
    const allMeals = mealResponses
    .map((response) => response.data.meals)
    .filter((mealArray) => mealArray)
    .flat();
     
     meals = allMeals;
  } catch (error) {
    throw new Error(`${error}`)
    }
    
    return meals;
}

export async function fetchMealById(id:number) {
  const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  return response.data;
}

export async function fetchMealsCategories() {
  const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
  return response.data.categories;
}


export async function fetchMealsByCategory(category:string) {
  const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  return response.data;
}