import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import { ToastContainer } from 'react-toastify';

import ProtectedRoute from './common/protectedRoute';
import About from './components/about';
import CreateDrawing from './components/createDrawing';
import EditDrawing from './components/editDrawing';
import Footer from './components/footer';
import Home from './components/home';
import Logout from './components/logout';
import MyDrawings from './components/myDrawings';
import Navbar from './components/navbar';
import PainterSignup from './components/painterSignup';
import Signin from './components/signin';
import Signup from './components/signup';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser } from './services/userService';

class App extends Component {
  state = { user: null };

  componentDidMount(): void {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render(): React.ReactNode {
    const { user } = this.state;
    return (
      <div className="d-flex flex-column min-vh-100">
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main className="container-fluid flex-fill">
          <Switch>
            <ProtectedRoute
              component={EditDrawing}
              painter="true"
              path="/edit/:id"
            />
            <ProtectedRoute
              component={CreateDrawing}
              painter="true"
              path="/create-drawing"
            />
            <ProtectedRoute
              component={MyDrawings}
              painter="true"
              path="/my-drawings"
            />
            <Route component={Signup} path="/sign-up" />
            <Route component={PainterSignup} path="/painter-sign-up" />
            <Route component={Signin} path="/sign-in" />
            <Route component={Logout} path="/logout" />
            <Route component={About} path="/about" />
            <Route component={Home} exact path="/" />
            <Redirect to="/" /> {/* add 404 page not found */}
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
