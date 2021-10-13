import React from 'react';
import logo from '../images/logo_lr.gif';

function Loading() {
  return (
    <main className="loading-container">
      <img src={ logo } alt="Laoding icon" />
      <h4>Loading...</h4>
    </main>
  );
}

export default Loading;
