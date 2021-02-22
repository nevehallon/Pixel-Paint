import { RouteComponentProps } from 'react-router-dom';

export interface ProtectedRouteArgs {
  component: React.ComponentType<any>;
  render?: (props: RouteComponentProps<any>) => any;
  painter: boolean | string;
  path?: string;
}
