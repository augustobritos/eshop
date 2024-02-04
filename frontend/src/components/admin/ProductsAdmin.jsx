import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchStock } from "../../redux/middlewares/stockThunk";

import ProductsAdminCard from "./ui/ProductsAdminCard";

function Products() {

  const { stock, loading, error } = useSelector((state) => state.stock);  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStock());
  }, [dispatch]);

  if(stock.length === 0) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <p className="text-2xl font-bold text-slate-300">
          No hay productos cargados aun!
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {stock && stock.map((product) => <ProductsAdminCard product={product} key={product.id} />)}
    </div>
  );
}

export default Products;
