import { useHistory } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { Menubar, MenubarProps } from 'primereact/menubar';

type MenuItem = Exclude<MenubarProps['model'], undefined>[number];

const Navbar = ({ user }: { [key: string]: any } | any): any => {
  const history = useHistory();

  const items = [
    {
      command: (event: any) => {
        event.originalEvent.preventDefault();
        history.push('/');
      },
      template: (item: MenuItem, options: any) => {
        const { target } = item;
        return (
          <a
            aria-haspopup="false"
            className={options.className}
            href="/"
            onClick={options.onClick}
            role="menuitem"
            tabIndex={0}
            target={target}
          >
            PixelHub <i className="fas fa-paint-brush" /> App
          </a>
        );
      },
    },
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => history.push('/'),
    },
    {
      label: 'About',
      icon: 'pi pi-fw pi-info-circle',
      command: () => history.push('/about'),
    },
    {
      label: 'Studio',
      icon: 'pi pi-fw pi-palette',
      style: { display: user ? '' : 'none' },
      items: [
        {
          label: 'Create Drawing',
          icon: 'pi pi-fw pi-image',
          command: () => history.push('/create-drawing'),
        },
        {
          label: 'My Drawings',
          icon: 'pi pi-fw pi-images',
          command: () => history.push('/my-drawings'),
        },
        {
          label: 'My favorites',
          icon: 'pi pi-fw pi-star',
          command: () => history.push('/my-favorites'),
        },
      ],
    },
    {
      label: 'Account',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Sign In',
          icon: 'pi pi-fw pi-sign-in',
          style: { display: !user ? '' : 'none' },
          command: () => history.push('/sign-in'),
        },
        {
          label: 'Sign Up',
          icon: 'pi pi-fw pi-user-plus',
          style: { display: !user ? '' : 'none' },
          command: () => history.push('/sign-up'),
        },
        {
          label: 'Sign Up as a Painter',
          icon: 'fas fa-paint-brush',
          style: { display: !user?.painter ? '' : 'none', fontSize: 14 },
          command: () => history.push('/painter-sign-up'),
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-sign-out',
          style: { display: user ? '' : 'none' },
          command: () => history.push('/logout'),
        },
      ],
    },
  ];

  const end = <InputText placeholder="Search" type="text" />;

  return (
    <div>
      <Menubar end={end} model={items as any} />
    </div>
  );
};

export default Navbar;
