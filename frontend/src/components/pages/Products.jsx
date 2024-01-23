import { useEffect } from "react";
import { useProducts } from "../../context/ProductsContext";
import ProductsCard from "../ui/products/ProductsCard";
import { Container } from "../ui/Container";

function Products() {
  const { products, getProducts } = useProducts();
  
  useEffect(() => {
    getProducts();
  }, []);

  if(products.length === 0) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <p className="text-2xl font-bold text-slate-300">
          No hay productos cargados aun!
        </p>
      </div>
    );
  }

  return (
    <Container className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
      {products && products.map((product) => <ProductsCard product={product} key={product.id} />)}
    </Container>
  );
}

export default Products;
