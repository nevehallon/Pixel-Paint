import { Link, NavLink, useHistory } from 'react-router-dom';

import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import { Menubar, MenubarProps } from 'primereact/menubar';

type MenuItem = Exclude<MenubarProps['model'], undefined>[number];

const Navbar = ({ user }: { [key: string]: any } | any): any => {
  const history = useHistory();

  const items /* : MenuItem[] */ = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-file',
      template: (
        <NavLink className="nav-link" exact to="/">
          Home
        </NavLink>
      ),
    },
    {
      label: 'About',
      icon: 'pi pi-fw pi-pencil',
      template: (
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      ),
    },
    {
      label: 'Studio',
      icon: 'pi pi-fw pi-user',
      disabled: !user,
      items: [
        {
          label: 'Create Drawing',
          icon: 'pi pi-fw pi-bookmark',
          template: (
            <NavLink className="nav-link" to="/create-drawing">
              <small>Create Drawing</small>
            </NavLink>
          ),
        },
        {
          label: 'My Drawings',
          icon: 'pi pi-fw pi-video',
          template: (
            <NavLink className="nav-link" to="/my-drawings">
              <small>My Drawings</small>
            </NavLink>
          ),
        },
      ],
    },
    {
      label: 'Account',
      icon: 'pi pi-fw pi-calendar',
      disabled: user,
      items: [
        {
          label: 'Sign In',
          icon: 'pi pi-fw pi-bookmark',
          template: (
            <NavLink className="nav-link" to="/sign-in">
              <small>Sign In</small>
            </NavLink>
          ),
        },
        {
          label: 'My Drawings',
          icon: 'pi pi-fw pi-video',
          template: (
            <NavLink className="nav-link" to="/sign-up">
              <small>Sign Up</small>
            </NavLink>
          ),
        },
        {
          label: 'My Drawings',
          icon: 'pi pi-fw pi-video',
          template: (
            <NavLink className="nav-link pl-2 pr-0" to="/painter-sign-up">
              <small>Create Painter Account</small>
            </NavLink>
          ),
        },
      ],
    },
    {
      label: 'Log Out',
      icon: 'pi pi-fw pi-calendar',
      command: () => history.replace('/logout'),
    },
  ];

  const start = (
    <Link className="navbar-brand" to="/">
      PixelPaint <i className="fas fa-paint-brush" /> App
    </Link>
  );
  const end = <InputText placeholder="Search" type="text" />;

  return (
    <div>
      <div className="card">
        <Menubar end={end} model={items} start={start} />
      </div>
    </div>
  );
};

export default Navbar;
