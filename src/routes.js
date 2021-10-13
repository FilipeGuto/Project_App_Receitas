import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Bebidas from './pages/Bebidas';
import Comidas from './pages/Comidas';
import DetalhesBebidas from './pages/DetalhesBebidas';
import DetalhesComidas from './pages/DetalhesComidas';
import Explorar from './pages/Explorar';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarBebidasIng from './pages/ExplorarBebidasIng';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarComidasArea from './pages/ExplorarComidasArea';
import ExplorarComidasIng from './pages/ExplorarComidasIng';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import ProgressoBebida from './pages/ProgressoBebida';
import ProgressoComida from './pages/ProgressoComida';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';

function Routes() {
  return (
    <div>
      <Switch className="test">
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas/:id/in-progress" component={ ProgressoComida } />
        <Route exact path="/bebidas/:id/in-progress" component={ ProgressoBebida } />
        <Route exact path="/comidas/:id" component={ DetalhesComidas } />
        <Route exact path="/bebidas/:id" component={ DetalhesBebidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route path="/explorar/comidas/ingredientes" component={ ExplorarComidasIng } />
        <Route path="/explorar/bebidas/ingredientes" component={ ExplorarBebidasIng } />
        <Route exact path="/explorar/comidas/area" component={ ExplorarComidasArea } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
        <Route exact path="/loading" component={ Loading } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </div>
  );
}

export default Routes;
