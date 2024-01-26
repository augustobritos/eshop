import { Route, Routes, Outlet } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute";

import { useAuth } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from"./context/CartContext";

import { Container } from "./components/ui/Container";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import SignUp from "./components/admin/SignUp";
import SignIn from "./components/admin/SignIn";
import Profile from "./components/admin/Profile";
import Products from "./components/pages/Products";
import ProductView from "./components/ui/products/ProductView";
import Cart from "./components/pages/Cart";
import ProductForm from "./components/admin/ProductForm";
import SuccessPayment from "./components/pages/SuccessPayment";
import Footer from "./components/pages/Footer";
import NotFound from "./components/pages/NotFound";

import ProductsAdmin from "./components/admin/ProductsAdmin";

import WhatsappButton from "./components/ui/WhatsappButton";

function App() {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Routes>
          <Route
            element={
              <ProtectedRoute isAllowed={!isAuth} redirectTo="/signin" />
            }
          >
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>

          <Route
            element={<ProtectedRoute isAllowed={isAuth} redirectTo="/signin" />}
          >
            <Route path="/profile" element={<Profile />} />

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

          <Route path="/" element={<Home />} />
          <Route
            element={
              <ProductsProvider>
                <CartProvider>
                <Outlet />
                </CartProvider>
                
              </ProductsProvider>
            }
          >
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductView />}/>
            <Route path="/cart" element={<Cart />} />
          </Route>
 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />

          <Route
            element={<ProtectedRoute isAllowed={true} redirectTo="/signin" />}
          >
            <Route path="/success" element={<SuccessPayment />} />
          </Route>
        </Routes>
      </Container>
      <WhatsappButton className="fixed bottom-4 right-4"/>
      <Footer />
    </>
  );
}

export default App;
