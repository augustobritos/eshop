import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { Container, Card, Input, TextArea, Label, Button } from "../ui/Index";

function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const {
    createProduct,
    getProduct,
    updateProduct,
    fileUpload,
    errors: productErrors,
  } = useProducts();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    
    if (!window.confirm("Estas seguro que deseas agregar este producto?")) {
      return;
    }

    if (!params.id) {
      const res = await createProduct(data);
      console.log(res);
      navigate("/admin");
    } else {
      const product = await updateProduct(params.id, data);
      if (product) {
        navigate("/admin");
      }
    }
  });

  const onImageSelect = async (e) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const link = await fileUpload(file);

        // Update state with callback function
        setFileLink((prevLink) => {
          // Use the updated state to set the value
          setValue("image", link);

          // Return the new state
          return link;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const params = useParams();
  const title = params.id ? "Editar Producto" : "Agregar Producto";
  const button = params.id ? "Actualizar" : "Agregar Producto";

  const [fileLink, setFileLink] = useState("");

  useEffect(() => {
    if (params.id) {
      getProduct(params.id)
        .then((product) => {
          setValue("title", product.title);
          setValue("description", product.description);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, []);

  return (
    <Container className="relative h-[80vh] justify-center items-center cont">
      <Card className="px-4">
        {productErrors.map((error) => (
          <p key={error} className="bg-red-500 text-center p-2">
            {error}
          </p>
        ))}
        <div className="flex justify-center items-center">
          <h1 className="text-4xl font-bold my-10">{title}</h1>
        </div>
        <form onSubmit={onSubmit} className="my-4 relative">
          <Label htmlFor="title" className="relative text-center">
            Producto
          </Label>
          <Input
            type="text"
            placeholder="Nombre"
            autoFocus
            {...register("title", { required: true })}
          />
          <Label htmlFor="price">Precio</Label>
          <Input
            type="text"
            placeholder="Precio"
            autoFocus
            {...register("price", { required: true })}
          />
          {errors.title && (
            <p className="text-red-500 text-xs">
              El titulo es un campo requerido.
            </p>
          )}

          <Label htmlFor="description">Descripcion</Label>
          <TextArea
            placeholder="Descripcion"
            rows={3}
            {...register("description", { required: false })}
          />

          <Label htmlFor="image">Imagen</Label>
          <Input
            type="file"
            placeholder="Imagen"
            autoFocus
            onChange={onImageSelect}
          />

          {fileLink && <img src={fileLink} width={400} height={400} />}

          <div className="flex justify-center items-center">
            <Button className="w-96 text-center">{button}</Button>
          </div>
        </form>
      </Card>
    </Container>
  );
}

export default ProductForm;
