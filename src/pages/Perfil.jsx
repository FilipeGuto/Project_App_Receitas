import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import getAvatarImg from '../services/gravatarAPI';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';

export default function Perfil() {
  const history = useHistory();
  const [gravatarImg, setGravatarImg] = useState();

  function getReceitasFeitas() {
    const redirect = '/receitas-feitas';
    history.push(redirect);
  }

  function getReceitasFavoritas() {
    const redirect = '/receitas-favoritas';
    history.push(redirect);
  }

  function getLoginPage() {
    const redirect = '/';
    return localStorage.clear() || history.push(redirect);
  }

  function getStorage() {
    const { email } = JSON.parse(localStorage.getItem('user'));
    return email;
  }

  useEffect(() => {
    setGravatarImg(getAvatarImg(getStorage()));
  }, []);

  return (
    <main className="main-content">
      <Header pageTitle="Perfil" searchButton={ false } />
      <section className="perfil-section">
        <img src={ gravatarImg } alt="Perfil Foto" />
        <h4 data-testid="profile-email">
          { localStorage.getItem('user') && getStorage() }
        </h4>
        <Button
          text="Receitas Feitas"
          dataTest="profile-done-btn"
          onClick={ getReceitasFeitas }
        />
        <Button
          text="Receitas Favoritas"
          dataTest="profile-favorite-btn"
          onClick={ getReceitasFavoritas }
        />
        <Button
          text="Sair"
          dataTest="profile-logout-btn"
          onClick={ getLoginPage }
        />
      </section>
      <Footer />
    </main>
  );
}
