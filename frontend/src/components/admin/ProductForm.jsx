import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useProducts } from "../../context/ProductsContext";

import {
  Container,
  Card,
  TextField,
  Button,
  IconButton,
  CardMedia,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  LoadingSpinner,
  SuccessAlert,
  WarningAlert,
} from "../ui/alerts/index.js";

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
  const [fileLinks, setFileLinks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    quantity: "",
    description: "",
    images: [],
  });
  const [editMode, setEditMode] = useState(false);
  const title = params.id ? "Editar Producto" : "Agregar Producto";
  const button = params.id ? "Actualizar" : "Agregar Producto";
  const [loading, setLoading] = useState(false);
  const [successMessages, setSuccessMessages] = useState([]);
  const [warningMessages, setWarningMessages] = useState([]);

  useEffect(() => {
    if (params.id) {
      setEditMode(true);
      getProductById(params.id)
        .then((product) => {
          setFormData({
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            images: product.images,
          });
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      setEditMode(false);
      setFormData({
        title: "",
        price: "",
        quantity: "",
        description: "",
        images: [],
      });
    }
  }, [getProductById, params.id]);

  const handleSubmit = async (e) => {
    const addAlert = "Estas seguro que deseas agregar este producto?";
    const editAlert = "Estas seguro que deseas actualizar este producto?";

    e.preventDefault();
    if (!editMode) {
      if (!window.confirm(addAlert)) {
        return;
      }
    } else {
      if (!window.confirm(editAlert)) {
        return;
      }
    }

    if (!editMode && (!formData.images || formData.images.length === 0)) {
      alert(
        "Por favor, sube una imagen al menos antes de enviar el formulario."
      );
      return;
    }

    if (!editMode) {
      const res = await createProduct(formData);
      console.log(res);
      if (res) {
        setSuccessMessages((prevMessages) => [...prevMessages, res.message]);
        setFormData({
          title: "",
          price: "",
          quantity: "",
          description: "",
          images: [],
        });
      }
    } else {
      const res = await updateProduct(params.id, formData);
      setSuccessMessages((prevMessages) => [...prevMessages, res.message]);
      console.log(successMessages);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImagesUpload = async (e) => {
    const MAX_SIZE = 100000; // 0.1 MB
    try {
      if (e.target.files && e.target.files.length > 0) {
        const imageFiles = Array.from(e.target.files).filter((file) => {
          const isImageType = file.type.startsWith("image/");
          const isBelowMaxSize = file.size <= MAX_SIZE;
          return isImageType && isBelowMaxSize;
        });

        if (imageFiles.length !== e.target.files.length) {
          alert(
            "Some files are not supported or exceed the maximum file size."
          );
        }

        setLoading(true);
        const uploadedFileLinks = await Promise.all(
          imageFiles.map(async (file) => {
            try {
              const link = await fileUpload(file);
              return link;
            } catch (uploadError) {
              console.error(`Failed to upload image:`, uploadError);
              throw new Error(`Failed to upload image. Please try again.`);
            }
          })
        );

        setFileLinks(uploadedFileLinks);
        const newFormData = { ...formData, images: uploadedFileLinks };
        setFormData(newFormData);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleImageDelete = (imageIndex) => {
    try {
      const updatedImages = formData.images.filter(
        (_, index) => index !== imageIndex
      );
      setFormData({ ...formData, images: updatedImages });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Card sx={{ p: 4 }}>
        <Box>
          {successMessages &&
            successMessages.length > 0 &&
            successMessages.map((msg, index) => (
              <SuccessAlert key={index} message={msg} />
            ))}
          {warningMessages && warningMessages.length > 0 && (
            <WarningAlert message={warningMessages} />
          )}
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {title}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Producto"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Precio"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Unidades"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripcion"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                minRows={3}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesUpload}
                hidden
                id="upload-button"
              />
              <label htmlFor="upload-button">
                <Button variant="outlined" color="secondary" component="span">
                  Seleccionar imagenes
                </Button>
              </label>
            </Grid>

            {formData?.images?.length > 0 && (
              <Grid container spacing={2}>
                {formData?.images.map((img, index) => (
                  <Grid item xs={1.5} mt={1.5} key={index}>
                    <CardMedia
                      component="img"
                      src={img}
                      alt={`Product ${index}`}
                      sx={{
                        height: 150,
                        maxHeight: "150px",
                        width: 150,
                        maxWidth: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      aria-label="delete image"
                      onClick={() => handleImageDelete(index)}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                type="submit"
              >
                {button}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
      {loading && <LoadingSpinner />}
    </Container>
  );
}

export default ProductForm;
