import logo from './logo.svg';
import './App.css';
import React, { Component, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
// import Loadable from 'react-loadable';
import { Routes, Route , BrowserRouter as Router} from 'react-router-dom';

import routes from './routes/main';
import { history } from  './utilities'
import Loader from './components/Loader';
import HomePage from './pages/HomePage';
import CreatePlanPage from './pages/CreatePlanPage';
import NavBar from './pages/NavBar/NavBar';
// import {PrivateRoute} from './components/PrivateRoute';

class App extends Component {
  render() {
    const menu = routes.map((route, index) => {
      return (route.component) ? (
        <Route
              key={index}
              path={route.path}
              exact={route.exact}
              name={route.name}
              element={<route.component/> }
              // render={props => (
              //     <route.component {...props} />
              // )}
        />
      ) : (null);
    });

    return (
        <Suspense fallback={<Loader/>}>
          <Router history={history}>
            <div>
              <NavBar />
              <Routes>
                  {menu}
                  {/* <Route exact path="/" element={<HomePage/>} />
                  <Route exact path="/createPlan" element={<CreatePlanPage/>} /> */}
              </Routes>              
            </div>
          </Router>  
        </Suspense>
    );
  }

    // return (
    //   <HomePage/>
    // );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  
}

export default App;
