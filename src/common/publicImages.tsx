import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PublicImages(): JSX.Element {
  const query = useQuery();

  const src = query.get('data');

  return (
    <div
      style={{
        height: '100vh',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <img
        alt="drawing"
        src={src as string}
        style={{
          background: '#fff',
        }}
      />
    </div>
  );
}

export default PublicImages;
