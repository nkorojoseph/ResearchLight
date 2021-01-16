import React, {Fragment,useEffect} from  'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routes/PrivateRoute'
import CreateProfile from './components/profileForm/CreateProfile'
import AddExperience from './components/profileForm/AddExperience'
import AddEducation from './components/profileForm/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import './App.css';
import EditProfile from './components/profileForm/EditProfile'
//import provider for the redux to tie redux and react
import {Provider } from 'react-redux'
import store from '../src/store/store'
import {loadUser} from './actions/auth/auth'
import setAuthToken from './util/setAuthToken';


const App=()=> {

  useEffect(()=>{
    setAuthToken(localStorage.token)
    store.dispatch(loadUser())
  },[])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar>
          </Navbar>
          <Route component={Landing} exact path='/' ></Route>
          <section className="container">
            <Alert></Alert>  
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path='/profiles' component={Profiles}  ></Route>
              <Route exact path='/profile/:id' component={Profile}  ></Route>
              <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}></PrivateRoute>
              <PrivateRoute exact path="/edit-profile" component={EditProfile}></PrivateRoute>
              <PrivateRoute exact path="/add-experience" component={AddExperience}></PrivateRoute>
              <PrivateRoute exact path="/add-education" component={AddEducation}></PrivateRoute>
            </Switch>
          </section>
        </Fragment> 
      </Router>
    </Provider>
    
  );
}

export default App;
