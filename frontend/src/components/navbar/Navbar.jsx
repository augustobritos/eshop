import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchStock } from "../../redux/middlewares/stockThunk";
import { publicRoutes, privateRoutes } from "./Navigation";
import { useAuth } from "../../context/AuthContext";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Hidden,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";

function Navbar({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const { isAuth, user, signOut } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { stock, loading, error } = useSelector((state) => state.stock);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStock()).catch((err) => {
      console.error("Failed to fetch stock:", err);
    });
  }, [dispatch]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleSearchInputChange = (event) => {
    const searchValue = event.target.value;

    setSearchQuery(searchValue);

    if (stock && stock.length > 0) {
      const matchingItems = stock.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );

      navigate("/listing", { state: { matchingItems } });
    }
  };

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }}>
            Tienda
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="search"
            sx={{ ml: 1 }}
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Buscar..."
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchInputChange}
            sx={{ color: "inherit", ml: 1 }}
          />
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Hidden smDown>
            <div>
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
                  <Button
                    component={Link}
                    to="/profile"
                    color="inherit"
                    sx={{ mx: 1 }}
                  >
                    <Avatar alt={user.name} src={user.gravatar} />
                    {user.name}
                  </Button>
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
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
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
              <ListItemButton component={Link} to="/profile">
                <ListItemIcon>
                  <Avatar alt={user.name} src={user.gravatar} />
                </ListItemIcon>
                <ListItemText primary={user.name} />
              </ListItemButton>
              <ListItemButton onClick={signOut}>
                <ListItemText primary="Salir" />
              </ListItemButton>
            </>
          ) : (
            publicRoutes.map(({ name, path, icon }) => (
              <ListItemButton
                key={path}
                component={Link}
                to={path}
                selected={location.pathname === path}
              >
                <ListItemText primary={name} />
                <ListItemIcon>{icon}</ListItemIcon>
              </ListItemButton>
            ))
          )}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
