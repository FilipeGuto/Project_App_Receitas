import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchIngrediente, fetchName,
  fetchPrimeiraLetra, getMealCategoriesList,
  getMealCategoryFilter } from '../services/fetchRadioComidas';
import Loading from '../components/Loading';
import Header from '../components/Header';
import CardsComida from '../components/CardsComida';
import Footer from '../components/Footer';
import Category from '../components/Category';

const QUANTIDADE_RECEITAS = 12;

function Comidas({ inputTextInitialValue }) {
  const [radioSelecionado, setRadioSelecionado] = useState('');
  const [resultFetch, setResultFetch] = useState([]);
  const { push } = useHistory();
  const [categoryList, setCategoryList] = useState([]);
  const [alreadySelectedCategory, setAlreadySelectedCategory] = useState('');

  const componentLoad = useCallback(async () => {
    setCategoryList(await getMealCategoriesList());
    setResultFetch(await fetchName(''));
  }, []);

  const getByIngredient = useCallback(async () => {
    setResultFetch(await fetchIngrediente(inputTextInitialValue));
  }, [inputTextInitialValue]);

  useEffect(() => {
    if (inputTextInitialValue.length > 0) {
      getByIngredient();
    } else {
      componentLoad();
    }
  }, [componentLoad, getByIngredient, inputTextInitialValue]);

  const selectCategoryFilter = async (category) => {
    if (alreadySelectedCategory === category) {
      componentLoad();
    } else {
      setResultFetch(await getMealCategoryFilter(category));
      setAlreadySelectedCategory(category);
    }
  };

  const verificaRadioFetch = async (input) => {
    switch (radioSelecionado) {
    case 'ingrediente':
      setResultFetch(await fetchIngrediente(input));
      break;
    case 'nome':
      setResultFetch(await fetchName(input));
      break;
    case 'firstLetter':
      if (input.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      setResultFetch(await fetchPrimeiraLetra(input));
      break;
    default:
      return null;
    }
    const resultFetchName = await fetchName(input);
    if (resultFetchName.length === 1) {
      push(`/comidas/${resultFetchName[0].idMeal}`);
    }
  };

  function enviarAlerta() {
    return (
      <main className="main-content">
        <Header pageTitle="Bebida" />
        {global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')}
        <Footer />
      </main>

    );
  }

  const pegarDozeElementos = () => resultFetch.slice(0, QUANTIDADE_RECEITAS);

  if (resultFetch !== null) {
    return (
      <main className="main-content">
        <Header
          pageTitle="Comidas"
          searchFuncs={ { setRadioSelecionado, verificaRadioFetch } }
        />
        <Category
          categories={ categoryList }
          onClick={ selectCategoryFilter }
          onClickAll={ componentLoad }
        />
        {resultFetch.length >= 1
          ? <CardsComida comidas={ pegarDozeElementos() } /> : <Loading />}
        <Footer />
      </main>
    );
  } return enviarAlerta();
}

Comidas.propTypes = {
  inputTextInitialValue: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  inputTextInitialValue: state.reducerFilter.text,
});

export default connect(mapStateToProps)(Comidas);
