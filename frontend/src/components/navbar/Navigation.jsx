import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';

export const publicRoutes = [
  {
    name: "Productos",
    path: "/products",
  },
  {
    name: "Nosotros",
    path: "/about",
  },
  {
    name: "Contacto",
    path: "/contact",
  },
  {
    name: "",
    path: "/cart",
    icon: <ShoppingCartIcon/>,
  },
];

export const privateRoutes = [
  {
    name: "Productos",
    path: "/admin",
    icon: <InventoryIcon />,
  },
  {
    name: "Nuevo",
    path: "/products/create",
    icon: <AddIcon />,
  },
];
