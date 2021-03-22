import { useState } from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   height: 380,
      //   transform: 'translateZ(0px)',
      //   flexGrow: 1,
    },
    speedDial: {
      position: 'absolute',
      bottom: theme.spacing(1),
      right: theme.spacing(2),
    },
  })
);

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <FavoriteIcon />, name: 'Like' },
];

export default function SpeedDialTooltipOpen(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Backdrop open={open} />
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
