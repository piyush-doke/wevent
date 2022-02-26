import React, { Component } from 'react';
import { Auth, container } from 'aws-amplify';
import { history } from '../../utilities';
import logo from './w_logo.jpg';
import { contains } from 'jquery';
export default class NavBar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {user: null}
  }
  
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      localStorage.removeItem('user');
      localStorage.clear('persist:persistedStore');
      history.push("/");
      history.go(0);
    } catch(error) {
      console.log(error.message);
    }
  }
  
  async componentDidMount() {
    this.setState({user: JSON.parse(localStorage.getItem('user'))});
    console.log(localStorage.getItem('user'))
  }
  
  render() {
    return (localStorage.getItem('user')) ? (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={logo} width="28" height="28" alt="wevent logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
        <container className="navbar-start">
            <button className="button is-light" variant="contained" onClick={()=>{
              history.push("/createPlan");
              history.go(0);
            }} >Create Plan</button>
            <button className="button is-light" variant="contained" onClick={()=>{
              history.push("/plans");
              history.go(0);
            }} >Plan Feed</button> {/* update plan from here */}
            <button className="button is-light" variant="contained" onClick={()=>{
              history.push("/searchEvents");
              history.go(0);
            }} >Search Events</button>
          </container>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.state.user && (
                <p>
                  Hello {this.state.user.name}
                </p>
              )}
              <div className="buttons">
              {!this.state.user && (
                <div>
                <button className="button is-primary" variant="contained" onClick={()=>{
                  history.push("/register");
                  history.go(0);
                }} >Register</button>
                <button className="button is-light" variant="contained" onClick={()=>{
                  history.push("/login");
                  history.go(0);
                }} >Login</button>
                </div>
              )}
              {this.state.user && (
                <button onClick={this.handleLogOut} className="button is-light">
                  Log out
                </button>
              )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    ) :
    (<nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="/">
      <img src={logo} width="28" height="28" alt="wevent logo" />
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-end">
        <div className="navbar-item">
          {this.state.user && (
            <p>
              Hello {this.state.user.name}
            </p>
          )}
          <div className="buttons">
          {!this.state.user && (
            <div>
            <button className="button is-primary" variant="contained" onClick={()=>{
              history.push("/register");
              history.go(0);
            }} >Register</button>
            <button className="button is-light" variant="contained" onClick={()=>{
              history.push("/login");
              history.go(0);
            }} >Login</button>
            </div>
          )}
          {this.state.user && (
            <button onClick={this.handleLogOut} className="button is-light">
              Log out
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  </nav>
)

  }
}