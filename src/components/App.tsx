import '../styles/App.css'
import { Routes, Route } from 'react-router';
import AllRecipes from '../pages/AllRecipes/AllRecipes';
import RecipeDetails from '../pages/RecipeDetails/RecipeDetails';
import Cart from '../pages/Cart/Cart';
import Layout from './Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<AllRecipes />} />
        <Route path='/:id' element={<RecipeDetails/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </Layout>
)
}

export default App
