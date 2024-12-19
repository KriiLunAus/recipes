import '../styles/App.css'
import { Routes, Route } from 'react-router-dom';
import AllRecipes from '../pages/AllRecipes/AllRecipes';
import RecipeDetails from '../pages/RecipeDetails/RecipeDetails';
import Cart from '../pages/Chosen/Chosen';
import Layout from './Layout';
import { useState } from 'react';

function App() {

  const [chosenRecipes, setChosenRecipes] = useState([]);
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<AllRecipes chosenRecipes={chosenRecipes} setChosenRecipes={setChosenRecipes} />} />
        <Route path='/:id' element={<RecipeDetails chosenRecipes={chosenRecipes} setChosenRecipes={setChosenRecipes}/>} />
        <Route path='/chosen' element={<Cart chosenRecipes={chosenRecipes} setChosenRecipes={setChosenRecipes}/>} />
      </Routes>
    </Layout>
)
}

export default App
