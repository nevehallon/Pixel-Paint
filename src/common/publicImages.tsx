import { Helmet } from 'react-helmet';
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
      {/* <meta
        content={`https://nevehallon.github.io/Pixel-Paint/#/public-images/?data=${encodeURIComponent(
          src as string
        )}`}
        property="og:image"
      /> */}
      <Helmet /* titleTemplate={`%s | ${site.siteMetadata.title}`} */>
        {/* <html lang={lang || 'en'} /> */}
        <title>pixelhub drawing</title>
        {/* <meta content={metaDescription} name="description" /> */}

        {/* socials */}
        <meta content="pixelhub drawing" property="og:title" />
        {/* <meta content={metaDescription} property="og:description" /> */}
        <meta content="website" property="og:type" />
        <meta
          content="nevehallon.github.io/Pixel-Paint/#/"
          property="og:site_name"
        />
        <meta content="en_US" property="og:locale" />
        <meta content="pixelhub drawing" property="article:author" />
        <meta
          content={`https://nevehallon.github.io/Pixel-Paint/#/public-images/?data=${encodeURIComponent(
            src as string
          )}`}
          property="og:image"
        />

        {/* twitter */}
        <meta content="summary" name="twitter:card" />
        {/* <meta content={site.siteMetadata.author} name="twitter:creator" /> */}
        {/* <meta content={site.siteMetadata.author} name="twitter:site" /> */}
        <meta content="pixelhub drawing" name="twitter:title" />
        {/* <meta content={metaDescription} name="twitter:description" /> */}
        <meta
          content={`https://nevehallon.github.io/Pixel-Paint/#/public-images/?data=${encodeURIComponent(
            src as string
          )}`}
          name="twitter:image"
        />

        {/* personal meta */}
        <link
          href="nevehallon.github.io/Pixel-Paint/#/"
          rel="me"
          type="text/html"
        />
      </Helmet>
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
