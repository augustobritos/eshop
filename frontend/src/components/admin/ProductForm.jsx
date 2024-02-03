import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { Container, Card, TextField, Button } from "@material-ui/core";

function ProductForm() {
  const {
    createProduct,
    getProductById,
    updateProduct,
    fileUpload,
    errors: productErrors,
  } = useProducts();
  const navigate = useNavigate();
  const params = useParams();
  const [fileLink, setFileLink] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    quantity: "",
    description: "",
  });

  const title = params.id ? "Editar Producto" : "Agregar Producto";
  const button = params.id ? "Actualizar" : "Agregar Producto";

  useEffect(() => {
    if (params.id) {
      getProductById(params.id)
        .then((product) => {
          setFormData({
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
          });
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [getProductById, params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Estas seguro que deseas agregar este producto?")) {
      return;
    }

    if (!params.id) {
      const res = await createProduct(formData);
      if(res) {
        console.log(res);
      }
    } else {
      const product = await updateProduct(params.id, formData);
      if (product) {
        navigate("/admin");
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = async (e) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const link = await fileUpload(file);
        setFileLink(link);
        setFormData({ ...formData, image: link });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="relative h-[80vh] justify-center items-center cont">
      <Card className="px-4">
        {productErrors.map((error, index) => (
          <p key={index} className="bg-red-500 text-center p-2">
            {error}
          </p>
        ))}
        <div className="flex justify-center items-center">
          <h1 className="text-4xl font-bold my-10">{title}</h1>
        </div>
        <form onSubmit={handleSubmit} className="my-4 relative">
          <TextField
            label="Producto"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Precio"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Unidades"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Descripcion"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            minRows={3}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ marginBottom: "10px" }}
          />
          {fileLink && (
            <img src={fileLink} alt="Product" width={400} height={400} />
          )}
          <div className="flex justify-center items-center">
            <Button
              variant="contained"
              color="secondary"
              className="w-96 text-center"
              type="submit"
            >
              {button}
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
}

export default ProductForm;
