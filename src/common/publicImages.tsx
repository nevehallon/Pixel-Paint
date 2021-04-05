import { useLocation } from 'react-router-dom';

function PublicImages(): JSX.Element {
  const { pathname } = useLocation();

  const src = pathname.replace('/public-images/', '');

  return (
    <div
      style={{
        height: '100vh',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <img alt="drawing" src={src} />
    </div>
  );
}

export default PublicImages;
