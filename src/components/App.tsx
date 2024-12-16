import '../styles/App.css'
import { Routes, Route } from 'react-router'
import AllRecipes from '../pages/AllRecipes/AllRecipes'
import OneRecipe from '../pages/OneRecipe/OneRecipe'
import Cart from '../pages/Cart/Cart'
import Navigation from './Navigation'
import CategoriesList from './CategoriesList'


function App() {
  return (
    <>
      <Navigation />
      <CategoriesList />
      <Routes>
        <Route path='/' element={<AllRecipes />} />
        <Route path='/52850' element={<OneRecipe />} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </>
)
}

export default App
