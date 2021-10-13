import React, { useCallback, useEffect, useState } from 'react';
import { getMealAreas, getMealByArea } from '../services/fetchRadioComidas';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardsComida from '../components/CardsComida';
import Loading from '../components/Loading';

import '../css/ExplorarComidasArea.css';

export default function ExplorarComidasArea() {
  const QUANTIDADE_RECEITAS = 12;
  const [selectAreas, setSelectAreas] = useState([]);
  const [mealAllByArea, setMealAllByArea] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const pegarDozeElementos = () => mealAllByArea.slice(0, QUANTIDADE_RECEITAS);

  const getByArea = async () => {
    setSelectAreas(await getMealAreas(''));
  };

  const mealByArea = useCallback(async () => {
    setMealAllByArea(await getMealByArea(selectedArea));
  }, [selectedArea]);

  useEffect(() => {
    getByArea();
  }, []);

  useEffect(() => {
    mealByArea();
  }, [mealByArea]);

  return selectAreas.length === 0 ? (
    <Loading />
  ) : (
    <main className="main-content">
      <Header pageTitle="Explorar Origem" />
      <div className="explorar-origem">
        <label htmlFor="area">
          <select
            name="area"
            id="area"
            data-testid="explore-by-area-dropdown"
            onChange={ (e) => (setSelectedArea(e.target.value)) }
          >
            <option data-testid="All-option">All</option>
            {selectAreas.map(({ strArea }, key) => (
              <option data-testid={ `${strArea}-option` } key={ key }>
                {strArea}
              </option>
            ))}
          </select>
        </label>
        {mealAllByArea
        && <CardsComida
          comidas={ pegarDozeElementos() }
        />}
      </div>
      <Footer />
    </main>
  );
}
