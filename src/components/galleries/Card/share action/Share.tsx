/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  OKShareCount,
  PinterestIcon,
  PinterestShareButton,
  PinterestShareCount,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TumblrShareCount,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  VKShareCount,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
} from 'react-share';

import './share.css';

const Share = ({ shareUrl }: { shareUrl: string }): JSX.Element => {
  // const shareUrl = 'http://github.com';
  const title = 'PaintHub';

  return (
    <div className="Share__container">
      <div className="Share__some-network">
        <FacebookShareButton
          className="Share__some-network__share-button"
          quote={title}
          url={shareUrl}
        >
          <FacebookIcon round size={32} />
        </FacebookShareButton>

        <div>
          <FacebookShareCount
            className="Share__some-network__share-count"
            url={shareUrl}
          >
            {(count) => count}
          </FacebookShareCount>
        </div>
      </div>

      <div className="Share__some-network">
        <FacebookMessengerShareButton
          appId="521270401588372"
          className="Share__some-network__share-button"
          url={shareUrl}
        >
          <FacebookMessengerIcon round size={32} />
        </FacebookMessengerShareButton>
      </div>

      <div className="Share__some-network">
        <TwitterShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <TwitterIcon round size={32} />
        </TwitterShareButton>

        <div className="Share__some-network__share-count">&nbsp;</div>
      </div>

      <div className="Share__some-network">
        <TelegramShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <TelegramIcon round size={32} />
        </TelegramShareButton>

        <div className="Share__some-network__share-count">&nbsp;</div>
      </div>

      <div className="Share__some-network">
        <WhatsappShareButton
          className="Share__some-network__share-button"
          separator=":: "
          title={title}
          url={shareUrl}
        >
          <WhatsappIcon round size={32} />
        </WhatsappShareButton>

        <div className="Share__some-network__share-count">&nbsp;</div>
      </div>

      <div className="Share__some-network">
        <LinkedinShareButton
          className="Share__some-network__share-button"
          url={shareUrl}
        >
          <LinkedinIcon round size={32} />
        </LinkedinShareButton>
      </div>

      <div className="Share__some-network">
        <PinterestShareButton
          className="Share__some-network__share-button"
          media={`${String(window.location)}/`} // ${/* exampleImage */}
          url={String(window.location)}
        >
          <PinterestIcon round size={32} />
        </PinterestShareButton>

        <div>
          <PinterestShareCount
            className="Share__some-network__share-count"
            url={shareUrl}
          />
        </div>
      </div>

      <div className="Share__some-network">
        <VKShareButton
          className="Share__some-network__share-button"
          image={`${String(window.location)}/`} // ${/* exampleImage */}
          url={shareUrl}
        >
          <VKIcon round size={32} />
        </VKShareButton>

        <div>
          <VKShareCount
            className="Share__some-network__share-count"
            url={shareUrl}
          />
        </div>
      </div>

      <div className="Share__some-network">
        <OKShareButton
          className="Share__some-network__share-button"
          image={`${String(window.location)}/`} // ${/* exampleImage */}
          url={shareUrl}
        >
          <OKIcon round size={32} />
        </OKShareButton>

        <div>
          <OKShareCount
            className="Share__some-network__share-count"
            url={shareUrl}
          />
        </div>
      </div>

      <div className="Share__some-network">
        <RedditShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
          windowHeight={460}
          windowWidth={660}
        >
          <RedditIcon round size={32} />
        </RedditShareButton>

        <div>
          <RedditShareCount
            className="Share__some-network__share-count"
            url={shareUrl}
          />
        </div>
      </div>

      <div className="Share__some-network">
        <TumblrShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <TumblrIcon round size={32} />
        </TumblrShareButton>

        <div>
          <TumblrShareCount
            className="Share__some-network__share-count"
            url={shareUrl}
          />
        </div>
      </div>

      <div className="Share__some-network">
        <LivejournalShareButton
          className="Share__some-network__share-button"
          description={shareUrl}
          title={title}
          url={shareUrl}
        >
          <LivejournalIcon round size={32} />
        </LivejournalShareButton>
      </div>

      <div className="Share__some-network">
        <MailruShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <MailruIcon round size={32} />
        </MailruShareButton>
      </div>

      <div className="Share__some-network">
        <EmailShareButton
          body="body"
          className="Share__some-network__share-button"
          subject={title}
          url={shareUrl}
        >
          <EmailIcon round size={32} />
        </EmailShareButton>
      </div>
      <div className="Share__some-network">
        <ViberShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <ViberIcon round size={32} />
        </ViberShareButton>
      </div>

      <div className="Share__some-network">
        <WorkplaceShareButton
          className="Share__some-network__share-button"
          quote={title}
          url={shareUrl}
        >
          <WorkplaceIcon round size={32} />
        </WorkplaceShareButton>
      </div>

      <div className="Share__some-network">
        <LineShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <LineIcon round size={32} />
        </LineShareButton>
      </div>

      <div className="Share__some-network">
        <WeiboShareButton
          className="Share__some-network__share-button"
          image={`${String(window.location)}/`} // ${/* exampleImage */}
          title={title}
          url={shareUrl}
        >
          <WeiboIcon round size={32} />
        </WeiboShareButton>
      </div>

      <div className="Share__some-network">
        <PocketShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <PocketIcon round size={32} />
        </PocketShareButton>
      </div>

      <div className="Share__some-network">
        <InstapaperShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <InstapaperIcon round size={32} />
        </InstapaperShareButton>
      </div>

      <div className="Share__some-network">
        <HatenaShareButton
          className="Share__some-network__share-button"
          title={title}
          url={shareUrl}
          windowHeight={460}
          windowWidth={660}
        >
          <HatenaIcon round size={32} />
        </HatenaShareButton>

        <div>
          <HatenaShareCount
            className="Share__some-network__share-count"
            url={shareUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default Share;
