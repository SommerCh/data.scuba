import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import CreateScuba from './components/create-scuba.component';
import EditScuba from './components/edit-scuba.component';
import ScubasList from './components/scubas-list.component';
import DeleteScuba from './components/delete-scuba.component';
import Background from './img/scuba-background.jpg'
import Logo from './img/logo.png'
import './index.css'

export default class App extends Component {
  render() {
  return (
    <Router>
 
    <div className="container">
<nav className=" navbar navbar-expand-lg navbar-light bg-dark">

<Link to="/" className="navbar-brand text-white"><img className="logo" src={Logo} alt="logo"/>Scuba Produkter</Link>
<div className="collapse navbar-collapse">
  <ul className="navbar-nav mr-auto">
    <li className="navbar-item">
      <Link to="/" className="nav-link text-white">Produkter</Link>
    </li>
    <li className="navbar-item">
      <Link to="/create" className="nav-link text-white">Nyt produkt</Link>
    </li>
  </ul>
</div>
</nav>

    <Route path="/" exact component={ScubasList} />
    <Route path="/edit/:id" component={EditScuba}/>
    <Route path="/create" component={CreateScuba}/>
    <Route path="/delete/:id" component={DeleteScuba}/>
    </div>
    <img className="back" src={Background} alt=""/>
    </Router> 
  )}
}


