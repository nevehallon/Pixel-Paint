import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ProtectedRoute from './common/protectedRoute';
import CreateDrawing from './components/drawingActions/createDrawing';
import EditDrawing from './components/drawingActions/editDrawing';
import { MyDrawings, MyFavorites } from './components/galleries';
import Footer from './components/layout/footer';
import Navbar from './components/layout/nav-bar';
import About from './components/pages/about';
import Home from './components/pages/home';
import Logout from './components/signAndLog/logout';
import PainterSignup from './components/signAndLog/painterSignup';
import Signin from './components/signAndLog/signin';
import Signup from './components/signAndLog/signup';
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
        <main className="container-fluid flex-fill" style={{ padding: 0 }}>
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
            <Route component={MyFavorites} path="/my-favorites" />
            <Route component={Signup} path="/sign-up" />
            <Route component={PainterSignup} path="/painter-sign-up" />
            <Route component={Signin} path="/sign-in" />
            <Route component={Logout} path="/logout" />
            <Route component={About} path="/about" />
            <Route component={Home} exact path="/" />
            <Redirect to="/" /> {/* TODO: add 404 page not found */}
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
