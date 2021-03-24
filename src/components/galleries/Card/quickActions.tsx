import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { OpenInNew, ShareOutlined } from '@material-ui/icons';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import {
  BookmarkIcon,
  BookmarkSlashFillIcon,
  GitForkIcon,
  LinkIcon,
} from '@primer/octicons-react';

import FavoritesContext from '../../../services/favoritesContext';

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

export default function SpeedDialTooltipOpen({
  emitOpen,
  emitClose,
  emitFavoriteAction,
  id,
  drawingNumber,
}: {
  emitOpen: () => void;
  emitClose: () => void;
  emitFavoriteAction: (isAdd: boolean) => void;
  id: string;
  drawingNumber: string | number;
}): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const favorites = useContext(FavoritesContext);

  const handleOpen = () => {
    emitOpen();
    setOpen(true);
  };

  const handleClose = () => {
    emitClose();
    setOpen(false);
  };

  const actions = [
    { icon: <InfoOutlinedIcon />, name: 'Info' },
    { icon: <GitForkIcon size={24} />, name: 'Fork' },
    { icon: <ShareOutlined />, name: 'Share' },
    {
      icon: !favorites.includes(drawingNumber) ? (
        <BookmarkIcon size={24} />
      ) : (
        <BookmarkSlashFillIcon size={24} />
      ),
      name: !favorites.includes(drawingNumber)
        ? 'Save to Favorites'
        : 'Remove from Favorites',
      handleAction: () => {
        emitFavoriteAction(!favorites.includes(drawingNumber));
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !favorites.includes(drawingNumber)
          ? toast.success('Saved to Favorites', { position: 'top-center' })
          : toast.dark('Removed from Favorites', { position: 'top-center' });
      },
    },
    { icon: <GetAppRoundedIcon />, name: 'Download Image' },
    { icon: <LinkIcon size={24} />, name: 'Copy Image Link' },
    { icon: <OpenInNew />, name: 'Open in New Window' },
  ];

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
        {actions.map((action) => (
          <SpeedDialAction
            icon={action.icon}
            key={action.name}
            onClick={() => {
              action.handleAction?.();
              handleClose();
            }}
            tooltipOpen
            tooltipPlacement="left"
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
