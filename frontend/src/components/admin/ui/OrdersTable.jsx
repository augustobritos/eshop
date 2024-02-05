import { useState, useEffect } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  ThemeProvider,
  TablePagination,
} from "@material-ui/core";
import { DeleteForever } from "@mui/icons-material";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const OrdersTable = ({
  theme,
  orders,
  handleUpdateStatus,
  handleConfirmDelete,
}) => {
  const columns = [
    { id: "id", name: "Orden ID" },
    { id: "customer", name: "Cliente" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Phone" },
    { id: "address", name: "Address" },
    { id: "products", name: "Productos" },
    { id: "total", name: "Total" },
    { id: "status", name: "Estado de la orden" },
    { id: "timestamp", name: "Fecha" },
    { id: "actions", name: "Acciones" },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, orders.length);
  const ordersToShow = orders.slice(startIndex, endIndex);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingFilter, setPendingFilter] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (orderId) => {
    setSelectedOrderId(orderId);
    setStatusDialogOpen(true);
  };

  const handleDeleteOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setDeleteDialogOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={() => setPendingFilter(!pendingFilter)} color="primary">
        {pendingFilter
          ? "Todas las órdenes"
          : "Solo pendientes"}
      </Button>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersToShow.map((order, i) => (
              <TableRow key={i}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.customer.email}</TableCell>
                <TableCell>{order.customer.phone}</TableCell>
                <TableCell>{order.customer.address}</TableCell>
                <TableCell>
                  {order.cart.map((product) => (
                    <div key={product.id}>{product.title}</div>
                  ))}
                </TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{"No timestamp available"}</TableCell>

                <TableCell>
                  <Tooltip title="Pagado">
                    <IconButton onClick={() => handleStatusChange(order.id)}>
                      <DoneAllIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleDeleteOrder(order.id)}>
                      <DeleteForever />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={orders.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
      >
        <DialogTitle>Marcar como pagado</DialogTitle>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleUpdateStatus(selectedOrderId);
              setStatusDialogOpen(false);
            }}
            color="primary"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confimar eliminacion</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleConfirmDelete(selectedOrderId);
              setDeleteDialogOpen(false);
            }}
            color="primary"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default OrdersTable;
