import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import a success icon

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(0.5),
  },
}));

const SuccessAlert = ({ message }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CheckCircleIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default SuccessAlert;
