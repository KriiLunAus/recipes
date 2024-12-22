export interface Meal {
    dateModified: null,
    idMeal: string,
    strArea: string,
    strCategory: string,
    strCreativeCommonsConfirmed: null,
    strDrinkAlternate: null,
    strImageSource: null,
    [key: `strIngredient${number}`]: string | null;
    strInstructions: string,
    strMeal: string,
    strMealThumb: string,  
    [key: `strMeasure${number}`]: string | null;
    strSource: null,
    strTags: string,
    strYoutube: string,
}
