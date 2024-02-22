import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

import { publicRoutes, privateRoutes } from "./Navigation";

import {
  Avatar,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

function NavbarDrawer({
  isAuth,
  user,
  open,
  onClose,
  categories,
  selectedCategory,
  handleCategorySelect,
  signOut
}) {
  const location = useLocation();

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {isAuth ? (
          <>
            {privateRoutes.map(({ name, path, icon }) => (
              <ListItemButton
                key={path}
                component={Link}
                to={path}
                selected={location.pathname === path}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            ))}
            <ListItemButton onClick={signOut} >
              <ListItemText primary="Salir" />
            </ListItemButton>
          </>
        ) : (
          publicRoutes.map(({ name, path, icon }) => (
            <Fragment key={path}>
              <ListItemButton
                key={path}
                component={Link}
                to={path}
                selected={location.pathname === path}
              >
                {name !== "Productos" && (
                  <>
                    <ListItemText primary={name} />
                    <ListItemIcon>{icon}</ListItemIcon>
                  </>
                )}
              </ListItemButton>
              {name === "Productos" && (
                <Accordion >
                  <AccordionSummary >
                    <Typography>Productos</Typography>
                  </AccordionSummary>
                  {categories && (
                    <AccordionDetails >
                      <List >
                        {categories.map((category) => (
                          <ListItemButton
                            component={Button}
                            key={category}
                            onClick={() => handleCategorySelect(category)}
                            selected={selectedCategory === category}
                          >
                            <ListItemText primary={category} />
                          </ListItemButton>
                        ))}
                      </List>
                    </AccordionDetails>
                  )}
                </Accordion>
              )}
            </ Fragment> 
          ))
        )}
      </List>
    </Drawer>
  );
}

export default NavbarDrawer;
