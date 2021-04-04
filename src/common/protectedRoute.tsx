import { Redirect, Route } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ProtectedRouteArgs } from '../interfaces/PotectedRouteArgs';
import { getCurrentUser } from '../services/userService';

const ProtectedRoute = ({
  component: Component,
  render,
  painter,
  ...rest
}: ProtectedRouteArgs): any => {
  const currentUser = getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser || (painter && !currentUser.painter)) {
          toast.error(
            <p className="text-center">
              Sorry, you need a `painter` account to access this page. <br />
              Feel free to create your own and start creating!
            </p>,
            {
              position: 'top-center',
              autoClose: 4000,
            }
          );
          return (
            <Redirect
              to={{
                pathname: '/sign-in',
                state: { from: props.location },
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render?.(props) || null;
      }}
    />
  );
};

export default ProtectedRoute;
