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

import './Demo.css';

const Demo = ({ shareUrl }: { shareUrl: string }): JSX.Element => {
  // const shareUrl = 'http://github.com';
  const title = 'PaintHub';

  return (
    <div className="Demo__container">
      <div className="Demo__some-network">
        <FacebookShareButton
          className="Demo__some-network__share-button"
          quote={title}
          url={shareUrl}
        >
          <FacebookIcon round size={32} />
        </FacebookShareButton>

        <div>
          <FacebookShareCount
            className="Demo__some-network__share-count"
            url={shareUrl}
          >
            {(count) => count}
          </FacebookShareCount>
        </div>
      </div>

      <div className="Demo__some-network">
        <FacebookMessengerShareButton
          appId="521270401588372"
          className="Demo__some-network__share-button"
          url={shareUrl}
        >
          <FacebookMessengerIcon round size={32} />
        </FacebookMessengerShareButton>
      </div>

      <div className="Demo__some-network">
        <TwitterShareButton
          className="Demo__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <TwitterIcon round size={32} />
        </TwitterShareButton>

        <div className="Demo__some-network__share-count">&nbsp;</div>
      </div>

      <div className="Demo__some-network">
        <TelegramShareButton
          className="Demo__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <TelegramIcon round size={32} />
        </TelegramShareButton>

        <div className="Demo__some-network__share-count">&nbsp;</div>
      </div>

      <div className="Demo__some-network">
        <WhatsappShareButton
          className="Demo__some-network__share-button"
          separator=":: "
          title={title}
          url={shareUrl}
        >
          <WhatsappIcon round size={32} />
        </WhatsappShareButton>

        <div className="Demo__some-network__share-count">&nbsp;</div>
      </div>

      <div className="Demo__some-network">
        <LinkedinShareButton
          className="Demo__some-network__share-button"
          url={shareUrl}
        >
          <LinkedinIcon round size={32} />
        </LinkedinShareButton>
      </div>

      <div className="Demo__some-network">
        <PinterestShareButton
          className="Demo__some-network__share-button"
          media={`${String(window.location)}/`} // ${/* exampleImage */}
          url={String(window.location)}
        >
          <PinterestIcon round size={32} />
        </PinterestShareButton>

        <div>
          <PinterestShareCount
            className="Demo__some-network__share-count"
            url={shareUrl}
          />
        </div>
      </div>

      <div className="Demo__some-network">
        <VKShareButton
          className="Demo__some-network__share-button"
          image={`${String(window.location)}/`} // ${/* exampleImage */}
          url={shareUrl}
        >
          <VKIcon round size={32} />
        </VKShareButton>

        <div>
          <VKShareCount
            className="Demo__some-network__share-count"
            url={shareUrl}
          />
        </div>
      </div>

      <div className="Demo__some-network">
        <OKShareButton
          className="Demo__some-network__share-button"
          image={`${String(window.location)}/`} // ${/* exampleImage */}
          url={shareUrl}
        >
          <OKIcon round size={32} />
        </OKShareButton>

        <div>
          <OKShareCount
            className="Demo__some-network__share-count"
            url={shareUrl}
          />
        </div>
      </div>

      <div className="Demo__some-network">
        <RedditShareButton
          className="Demo__some-network__share-button"
          title={title}
          url={shareUrl}
          windowHeight={460}
          windowWidth={660}
        >
          <RedditIcon round size={32} />
        </RedditShareButton>

        <div>
          <RedditShareCount
            className="Demo__some-network__share-count"
            url={shareUrl}
          />
        </div>
      </div>

      <div className="Demo__some-network">
        <TumblrShareButton
          className="Demo__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <TumblrIcon round size={32} />
        </TumblrShareButton>

        <div>
          <TumblrShareCount
            className="Demo__some-network__share-count"
            url={shareUrl}
          />
        </div>
      </div>

      <div className="Demo__some-network">
        <LivejournalShareButton
          className="Demo__some-network__share-button"
          description={shareUrl}
          title={title}
          url={shareUrl}
        >
          <LivejournalIcon round size={32} />
        </LivejournalShareButton>
      </div>

      <div className="Demo__some-network">
        <MailruShareButton
          className="Demo__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <MailruIcon round size={32} />
        </MailruShareButton>
      </div>

      <div className="Demo__some-network">
        <EmailShareButton
          body="body"
          className="Demo__some-network__share-button"
          subject={title}
          url={shareUrl}
        >
          <EmailIcon round size={32} />
        </EmailShareButton>
      </div>
      <div className="Demo__some-network">
        <ViberShareButton
          className="Demo__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <ViberIcon round size={32} />
        </ViberShareButton>
      </div>

      <div className="Demo__some-network">
        <WorkplaceShareButton
          className="Demo__some-network__share-button"
          quote={title}
          url={shareUrl}
        >
          <WorkplaceIcon round size={32} />
        </WorkplaceShareButton>
      </div>

      <div className="Demo__some-network">
        <LineShareButton
          className="Demo__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <LineIcon round size={32} />
        </LineShareButton>
      </div>

      <div className="Demo__some-network">
        <WeiboShareButton
          className="Demo__some-network__share-button"
          image={`${String(window.location)}/`} // ${/* exampleImage */}
          title={title}
          url={shareUrl}
        >
          <WeiboIcon round size={32} />
        </WeiboShareButton>
      </div>

      <div className="Demo__some-network">
        <PocketShareButton
          className="Demo__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <PocketIcon round size={32} />
        </PocketShareButton>
      </div>

      <div className="Demo__some-network">
        <InstapaperShareButton
          className="Demo__some-network__share-button"
          title={title}
          url={shareUrl}
        >
          <InstapaperIcon round size={32} />
        </InstapaperShareButton>
      </div>

      <div className="Demo__some-network">
        <HatenaShareButton
          className="Demo__some-network__share-button"
          title={title}
          url={shareUrl}
          windowHeight={460}
          windowWidth={660}
        >
          <HatenaIcon round size={32} />
        </HatenaShareButton>

        <div>
          <HatenaShareCount
            className="Demo__some-network__share-count"
            url={shareUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
