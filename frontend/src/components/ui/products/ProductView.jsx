import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";

import { useProducts } from "../../../context/ProductsContext.jsx";
import { Card, Button } from "../Index.js";
import { Container } from "../Container.jsx";

function ProductView() {
  const { getProductById } = useProducts();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  const onAddToCart = async () => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    if (params.id) {
      getProductById(params.id)
        .then((product) => {

          console.log(product);

          setProduct(product);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, []);

  return (
    <Container>
      <Card className="mx-auto my-4 py-4 shadow-md">
        <h1 className="flex justify-center items-center text-2xl font-semibold">
          {product ? product.title : "Loading..."}
        </h1>
        <div className="flex justify-center items-center py-4 overflow-hidden font-semibold">
          <img src={product ? product.image : ""} height={500} width={500} />
        </div>
        <p className="flex justify-center items-center py-4 overflow-hidden font-semibold">
          $ {product ? product.price : ""}
        </p>
        <p className="flex justify-center items-center py-4 overflow-hidden font-normal">
          Descripcion: {product ? product.description : ""}
        </p>
        <div className="flex justify-center items-center py-4">
          <Button className="text-sm" onClick={onAddToCart}>
            Añadir a la cesta
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default ProductView;
