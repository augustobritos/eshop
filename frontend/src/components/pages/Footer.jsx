import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Link, Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto',
    padding: theme.spacing(2),
    textAlign: 'center',
 },
  link: {
    margin: theme.spacing(0, 1),
    color: theme.palette.common.white,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="static" color='secondary' className={classes.footer}>
      <Toolbar>
        <Typography variant="body1" color="inherit">
          © {new Date().getFullYear()} MyStore.com | All Rights Reserved
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Hidden smDown>
          <Link href="#" className={classes.link}>
            Terms of Service
          </Link>
          <Link href="#" className={classes.link}>
            Privacy Policy
          </Link>
          <Link href="#" className={classes.link}>
            Contact Us
          </Link>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
