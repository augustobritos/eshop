import { Route, Routes, Outlet } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute";

import { useAuth } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";

import { Container } from "./components/ui/Container";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import SignUp from "./components/admin/SignUp";
import SignIn from "./components/admin/SignIn";
import Profile from "./components/admin/Profile";
import Products from "./components/pages/Products";
import ProductForm from "./components/admin/ProductForm";
import NotFound from "./components/pages/NotFound";

import ProductsAdmin from "./components/admin/ProductsAdmin";

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
            element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/signin" />}
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
                  <Outlet />
                </ProductsProvider>
              }
            >
              
            <Route path="/products" element={<Products />} />
            </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
