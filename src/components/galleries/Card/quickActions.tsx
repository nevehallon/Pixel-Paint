import { useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { OpenInNew, ShareOutlined } from '@material-ui/icons';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
// import BookmarkIcon from '@material-ui/icons/Bookmark';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { GitForkIcon, LinkIcon } from '@primer/octicons-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: 'absolute',
      bottom: theme.spacing(1),
      right: theme.spacing(2),
      '& .MuiSpeedDial-actions .MuiSpeedDialAction-staticTooltip .MuiSpeedDialAction-staticTooltipLabel': {
        width: 'max-content !important',
      },
    },
  })
);

/* TODO:
        * Options:
        ? Share (pi-share-alt),
        ? info (pi-info / pi-info-circle),
        ? fork (if others' drawing),
        ? open in new window (pi-external-link),
        ? download image (pi-download)
        ? copy image link (pi-link)
        ? add to favorites (pi-star (status favorite) / pi-star-o)
        */
const actions = [
  { icon: <InfoOutlinedIcon />, name: 'Info' },
  { icon: <GitForkIcon size={24} />, name: 'Fork' },
  { icon: <ShareOutlined />, name: 'Share' },
  { icon: <BookmarkBorderIcon />, name: 'Favorite' },
  // { icon: <Bookmark />, name: 'Favorite' },
  { icon: <GetAppRoundedIcon />, name: 'Download Image' },
  { icon: <LinkIcon size={24} />, name: 'Copy Image Link' },
  { icon: <OpenInNew />, name: 'Open in New Window' },
];

export default function SpeedDialTooltipOpen({
  emitOpen,
  emitClose,
}: {
  emitOpen: () => void;
  emitClose: () => void;
}): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    emitOpen();
    setOpen(true);
  };

  const handleClose = () => {
    emitClose();
    setOpen(false);
  };

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial tooltip"
        className={classes.speedDial}
        direction="up"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action, i) => (
          <SpeedDialAction
            icon={action.icon}
            key={action.name}
            onClick={handleClose}
            tooltipOpen
            tooltipPlacement="left"
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
