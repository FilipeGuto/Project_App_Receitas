import React from 'react';
import './css/App.css';
import SetInitialLocalStorage from './GlobalFuncs/setInitialLocalStorage';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';

function App() {
  SetInitialLocalStorage();

  return (
    <Routes />
  );
}

export default App;
