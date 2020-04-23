import React, {Fragment} from  'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
//import provider for the redux to tie redux and react
import {Provider } from 'react-redux'
import store from '../src/store/store'

const App=()=> {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar>
          </Navbar>
          <Route component={Landing} exact path='/' ></Route>
          <section className="container">
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
            </Switch>
          </section>
        </Fragment> 
      </Router>
    </Provider>

    

    
  );
}

export default App;
