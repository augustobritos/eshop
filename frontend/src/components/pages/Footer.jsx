import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Hidden,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: "auto",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  link: {
    margin: theme.spacing(0, 1),
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  divider: {
    backgroundColor: 'red',
    marginBottom: theme.spacing(2),
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="static" color="transparent" className={classes.footer}>
      <Toolbar>
        {/* Add the Divider at the top */}
        <Divider className={classes.divider} />
        <Typography variant="body1" color="inherit">
          © {new Date().getFullYear()} MyStore.com | All Rights Reserved
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Hidden smDown>
          <Link href="#" className={classes.link} color="inherit">
            Terminos del Servicio
          </Link>
          <Link href="#" className={classes.link} color="inherit">
            Politica de Privacidad
          </Link>
          <Link href="/contact" className={classes.link} color="inherit">
            Contactanos
          </Link>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
