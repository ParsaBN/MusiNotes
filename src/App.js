import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import Footer from './components/layout/Footer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">  
          <main className="app-content">
            <Navbar />
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/login' component={LogIn} />
              <Route path='/signup' component={SignUp} />
            </Switch>
          </main>
          <footer>
            <Footer/>
          </footer>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
