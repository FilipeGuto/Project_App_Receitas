import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinkIngredientsList } from '../services/fetchIngredientsList';
import ExploreByIngredients from '../components/ExploreByIngredients';
import Loading from '../components/Loading';

function ExplorarBebidasIng() {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    setIngredients(await fetchDrinkIngredientsList());
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  if (ingredients.length === 0) {
    return <Loading />;
  }

  return (
    <main className="main-content">
      <Header pageTitle="Explorar Ingredientes" searchButton={ false } />
      <ExploreByIngredients ingredients={ ingredients } type="drink" />
      <Footer />
    </main>
  );
}

export default ExplorarBebidasIng;
