import { Component } from 'react';

import { logout } from '../../services/userService';

class Logout extends Component {
  componentDidMount(): void {
    logout();
    window.location.href = '/';
  }

  render(): React.ReactNode {
    return null;
  }
}

export default Logout;
