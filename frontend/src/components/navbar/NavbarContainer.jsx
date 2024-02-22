import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { fetchStock } from "../../redux/middlewares/stockThunk";
import Navbar from "./Navbar";

function NavbarContainer({ darkMode, toggleDarkMode }) {
  const dispatch = useDispatch();
  const { stock } = useSelector((state) => state.stock);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuth, user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStock()).catch((err) => {
      console.error("Failed to fetch stock:", err);
    });
  }, [dispatch]);

  useEffect(() => {
    if (stock && stock.length > 0) {
      const uniqueCategories = [...new Set(stock.map((item) => item.category))];
      setCategories(uniqueCategories);
    }
  }, [stock]);

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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    if (stock && stock.length > 0) {
      const matchingItems = category
        ? stock.filter((product) => product.category === category)
        : stock;
      navigate("/listing", { state: { matchingItems } });
    }
  };

  return (
    <Navbar
      isAuth={isAuth}
      user={user}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      categories={categories}
      selectedCategory={selectedCategory}
      handleCategorySelect={handleCategorySelect}
      handleSearchInputChange={handleSearchInputChange}
      searchQuery={searchQuery}
      signOut={signOut}
    />
  );
}

export default NavbarContainer;
