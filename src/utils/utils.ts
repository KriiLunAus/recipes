import { Meal } from "../types/types";


export function getIngredients(meal: Meal) {
    const ingredients = [];

    for (let i = 1; i <= 15; i++){
      const ingredient = meal[`strIngredient${i}`]; 
      const measure = meal[`strMeasure${i}`];
      
      ingredients.push({ ingredient, measure });
    }
    return ingredients;
  }
  
export function capitalizeWords(string:string):string {
  return string.split(' ')
    .map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}