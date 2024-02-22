import { Link, useLocation } from "react-router-dom";

import { publicRoutes, privateRoutes } from "./Navigation";

import { Button, Hidden } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function NavbarMenu({ isAuth, signOut }) {
  const location = useLocation();

  return (
    <Hidden smDown>
      <>
        {isAuth ? (
          <>
            {privateRoutes.map(({ name, path, icon }) => (
              <Button
                key={path}
                component={Link}
                to={path}
                color={location.pathname === path ? "success" : "inherit"}
                sx={{ mx: 1 }}
                startIcon={icon}
              >
                {name}
              </Button>
            ))}
            <Button color="inherit" onClick={signOut}>
              Salir{""} <ExitToAppIcon />
            </Button>
          </>
        ) : (
          publicRoutes.map(({ name, path, icon }) => (
            <Button
              key={path}
              component={Link}
              to={path}
              color={location.pathname === path ? "error" : "inherit"}
              sx={{ mx: 1 }}
              startIcon={icon}
            >
              {name}
            </Button>
          ))
        )}
      </>
    </Hidden>
  );
}

export default NavbarMenu;
