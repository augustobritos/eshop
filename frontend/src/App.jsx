import { useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import { ProtectedRoute } from "./components/ProtectedRoute";

import { useAuth } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import SignUp from "./components/admin/SignUp";
import SignIn from "./components/admin/SignIn";
import Profile from "./components/admin/Profile";
import Products from "./components/pages/Products";
import ProductView from "./components/ui/products/ProductView";
import Cart from "./components/pages/cart/Cart";
import Checkout from "./components/pages/cart/Checkout";
import SuccessPayment from "./components/pages/cart/SuccessPayment";
import FailurePayment from "./components/pages/cart/FailurePayment";
import ProductForm from "./components/admin/ProductForm";
import Footer from "./components/pages/Footer";
import NotFound from "./components/pages/NotFound";
import ProductsAdmin from "./components/admin/ProductsAdmin";
import OrdersManagement from "./components/admin/OrdersManagement";
import WhatsappButton from "./components/ui/WhatsappButton";
import { Grid, Container, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const { isAuth, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Container
          sx={{
            paddingTop: "150px",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
          maxWidth="lg"
        >
          <Grid container spacing={2}>
            <Routes>
              {/* Public - Protected Routes */}
              <Route
                element={
                  <ProtectedRoute isAllowed={!isAuth} redirectTo="/signin" />
                }
              >
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
              </Route>

              {/* Private - Protected Routes */}
              <Route
                element={
                  <ProtectedRoute isAllowed={isAuth} redirectTo="/signin" />
                }
              >
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<OrdersManagement theme={theme}/>} />
                <Route
                  element={
                    <ProductsProvider>
                      <Outlet />
                    </ProductsProvider>
                  }
                >
                  <Route path="/products/create" element={<ProductForm />} />
                  <Route path="/products/edit/:id" element={<ProductForm />} />
                  <Route path="/admin" element={<ProductsAdmin />} />
                </Route>
              </Route>

              {/* Public - Non Protected Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/success" element={<SuccessPayment />} />
              <Route path="/failure" element={<FailurePayment />} />
              <Route path="*" element={<NotFound />} />
              <Route
                element={
                  <ProductsProvider>
                    <Outlet />
                  </ProductsProvider>
                }
              >
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductView />} />
                <Route path="/cart" element={<Cart theme={theme} />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Routes>
          </Grid>
        </Container>
        <Footer darkMode={darkMode} />
        <WhatsappButton className="fixed bottom-4 right-4" />
      </ThemeProvider>
    </>
  );
}

export default App;
