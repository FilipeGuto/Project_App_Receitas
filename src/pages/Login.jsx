import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import actionLogin from '../redux/actions';
import Button from '../components/Button';
import Input from '../components/Input';

import '../css/Login.css';

import logoDevlicias from '../images/logo-ver.png';

function Login({ actLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const validate = (emailParam, passwordParam) => {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
    const NUMBER_SIX = 6;
    if (passwordParam.length > NUMBER_SIX && emailTest.test(emailParam)) {
      return false;
    } return true;
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    actLogin(email);
    setIsLogged(true);
  };

  useEffect(() => {
    setIsValid(validate(email, password));
  }, [email, password]);

  return (
    <div className="login-body">
      {isLogged && <Redirect to="/comidas" />}
      <img src={ logoDevlicias } alt="Logo Devlicias" />
      <h1>Login</h1>
      <div className="form-main">
        <Input
          setValue={ setEmail }
          placeHolder="Email"
          testId="email-input"
        />
        <Input
          setValue={ setPassword }
          placeHolder="Password"
          type="password"
          testId="password-input"
        />
        <Button
          onClick={ () => handleClick() }
          text="Entrar"
          disabled={ isValid }
          dataTest="login-submit-btn"
        />
      </div>
    </div>
  );
}

Login.propTypes = {
  actLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actLogin: (emailAct) => dispatch(actionLogin(emailAct)),
});

export default connect(null, mapDispatchToProps)(Login);
