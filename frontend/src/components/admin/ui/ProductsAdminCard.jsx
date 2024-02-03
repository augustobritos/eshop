import { Card, Button, Typography, IconButton } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../../context/ProductsContext';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

function ProductsAdminCard({ product }) {
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();

  const { id, title, image, price, quantity, description } = product;

  return (
    <Card key={id} className="py-4 px-7 justify-center flex flex-col">
      <div className="mx-auto">
        <Typography variant="h5" component="h2" className="flex justify-center items-center text-2xl font-bold">
          {title}
        </Typography>

        <img
          src={image}
          className="object-contain w-64 h-64 mx-auto"
          alt="Product"
        />

        <Typography variant="body1" className="flex justify-center items-center py-4 overflow-hidden">
          $ {price}
        </Typography>

        <Typography variant="body1" className="flex justify-center items-center py-4 overflow-hidden"> Unidades: {quantity ? quantity : 0} 
          
        </Typography>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/products/edit/" + id);
          }}
          startIcon={<EditIcon />}
        >
          Editar
        </Button>
        
        <Button
          variant="contained"
          color="secondary"
          onClick={async () => {
            if (window.confirm("Are you sure you want to delete the product?")) {
              await deleteProduct(id);
            }
          }}
          startIcon={<DeleteIcon />}
        >
          Eliminar
        </Button>
      </div>
    </Card>
  );
}

export default ProductsAdminCard;
