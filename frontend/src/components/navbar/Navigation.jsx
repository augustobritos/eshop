import { FaTasks, FaPlusCircle, FaShoppingBasket } from "react-icons/fa";

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
    icon: <FaShoppingBasket />,
  },
];

export const privateRoutes = [
  {
    name: "Productos",
    path: "/admin",
    icon: <FaTasks />,
  },
  {
    name: "Nuevo",
    path: "/products/create",
    icon: <FaPlusCircle />,
  },
];
