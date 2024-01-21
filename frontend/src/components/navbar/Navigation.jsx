import { FaTasks, FaPlusCircle } from "react-icons/fa";


export const publicRoutes = [
  {
    name: "Productos",
    path: "/products",
    icon: <FaTasks />,
  },
  {
    name: "Nosotros",
    path: "/about",
  },
  {
    name: "Contacto",
    path: "/contact",
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
