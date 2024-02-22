import { useState } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  IconButton,
  InputBase,
  Hidden,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";
import NavbarDrawer from "./NavbarDrawer";
import NavbarMenu from "./NavbarMenu";

function Navbar({
  isAuth,
  user,
  darkMode,
  toggleDarkMode,
  categories,
  selectedCategory,
  searchQuery,
  handleSearchInputChange,
  handleCategorySelect,
  signOut,
}) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }}>
            anima.com
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
          <NavbarMenu isAuth={isAuth} signOut={signOut} />
        </Toolbar>
      </AppBar>
      <NavbarDrawer
        isAuth={isAuth}
        user={user}
        signOut={signOut}
        open={openDrawer}
        onClose={handleDrawerClose}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
      />
    </>
  );
}

export default Navbar;
