import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { actionInputHeader } from '../redux/actions';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import pix from '../images/pix.png';
import '../css/Header.css';
import '../css/Input.css';
import '../css/Button.css';

function Header({
  pageTitle,
  actionInpHeader,
  searchButton,
  searchFuncs: { setRadioSelecionado, verificaRadioFetch },
  inputHeader }) {
  const [toggleButtonSearch, setToggleButtonSearch] = useState(false);
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    actionInpHeader(searchInput);
  }, [actionInpHeader, searchInput]);

  const history = useHistory();

  function renderButton() {
    return (
      <button
        type="button"
        onClick={ () => setToggleButtonSearch((prevState) => !prevState) }
        data-testid="search-top-btn"
        src={ searchIcon }
        className="search-btn"
      >
        <img alt="icone-search" src={ searchIcon } />
      </button>
    );
  }

  function displaySearchInput() {
    return (
      <div className="filter-main">
        <label className="form-input" htmlFor="input-search">
          <input
            onChange={ ({ target }) => setSearchInput(target.value) }
            data-testid="search-input"
            type="text"
            id="input-search"
          />
        </label>
        <div className="filter-container">
          <div className="radio-btn-container">
            <label htmlFor="ingredient" className="radios-input">
              <input
                type="radio"
                value="ingrediente"
                data-testid="ingredient-search-radio"
                onChange={ ({ target }) => setRadioSelecionado(target.value) }
                name="radio"
              />
              Ingrediente
            </label>
            <label htmlFor="name" className="radios-input">
              <input
                type="radio"
                value="nome"
                data-testid="name-search-radio"
                name="radio"
                onChange={ ({ target }) => setRadioSelecionado(target.value) }
              />
              Nome
            </label>
            <label htmlFor="ingredient" className="radios-input">
              <input
                type="radio"
                value="firstLetter"
                data-testid="first-letter-search-radio"
                onChange={ ({ target }) => setRadioSelecionado(target.value) }
                name="radio"
              />
              Primeira letra
            </label>
          </div>
          <button
            type="button"
            onClick={ () => verificaRadioFetch(inputHeader.inputHeader) }
            data-testid="exec-search-btn"
            className="form-button"
          >
            Buscar
          </button>
        </div>
      </div>
    );
  }

  function renderButtonSpace() {
    return (
      <button type="button" className="search-btn">
        <img alt="" src={ pix } />
      </button>
    );
  }

  return (
    <header className="app-header">
      <div className="header-Items-container">
        <button
          type="button"
          data-testid="profile-top-btn"
          src={ profileIcon }
          onClick={ () => history.push('/perfil') }
          className="profile-btn"
        >
          <img alt="icone-profile" src={ profileIcon } />
        </button>

        <h3 data-testid="page-title">{pageTitle}</h3>

        <div>
          {searchButton
            ? renderButton()
            : renderButtonSpace() }
        </div>
      </div>

      {toggleButtonSearch && displaySearchInput()}
    </header>
  );
}

Header.defaultProps = {
  searchButton: true,
  searchFuncs: { setRadioSelecionado: () => {}, verificaRadioFetch: () => {} },
};

Header.propTypes = {
  actionInpHeader: PropTypes.func.isRequired,
  pageTitle: PropTypes.string.isRequired,
  searchButton: PropTypes.bool,
  inputHeader: PropTypes.shape({
    inputHeader: PropTypes.string,
  }).isRequired,
  searchFuncs: PropTypes.shape({
    setRadioSelecionado: PropTypes.func,
    verificaRadioFetch: PropTypes.func,
  }),
};

const mapStateToProps = (state) => ({
  inputHeader: state.reducerHeader,
});

const mapDispatchToProps = (dispatch) => ({
  actionInpHeader: (input) => dispatch(actionInputHeader(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
