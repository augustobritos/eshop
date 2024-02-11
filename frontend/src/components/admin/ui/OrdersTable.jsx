import { useState, useMemo } from "react";

import {
  Box,
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
  Typography,
} from "@material-ui/core";
import { DeleteForever } from "@mui/icons-material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const OrdersTable = ({
  theme,
  orders,
  handleConfirmOrder,
  handleConfirmDelete,
}) => {
  const columns = [
    { id: "id", name: "ID" },
    { id: "customer", name: "Cliente" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Telefono" },
    { id: "address", name: "Direccion" },
    { id: "products", name: "Productos" },
    { id: "quantity", name: "Cantidad" },
    { id: "total", name: "Total" },
    { id: "status", name: "Estado" },
    { id: "timestamp", name: "Fecha" },
    { id: "actions", name: "Acciones" },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingFilter, setPendingFilter] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (order) => {
    setSelectedOrder(order);
    setStatusDialogOpen(true);
  };

  const handleDeleteOrder = (order) => {
    setSelectedOrder(order);
    setDeleteDialogOpen(true);
  };

  const filteredAndPagedOrders = useMemo(() => {
    let result = orders;

    if (pendingFilter) {
      result = result.filter((order) => order.status === "Pendiente");
    }

    // Calculate the start and end indices for the current page
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Return the sliced array for the current page
    return result.slice(startIndex, endIndex);
  }, [orders, page, rowsPerPage, pendingFilter]);

  const handleTogglePendingFilter = () => {
    setPendingFilter(!pendingFilter);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => console.log("Copied to clipboard:", text))
      .catch((error) => console.error("Failed to copy to clipboard:", error));
  };

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={() => handleTogglePendingFilter()} color="secondary">
        {pendingFilter ? "Todas" : "Pendientes"}
      </Button>
      <TableContainer component={Paper} sx={{ maxWidth: 2000 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndPagedOrders.map((order, i) => (
              <TableRow key={i}>
                <TableCell>
                  {order.id.substring(15, 20)}
                  <Tooltip title="Copy ID">
                    <IconButton
                      onClick={() => copyToClipboard(order.id)}
                      color="secondary"
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>

                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.customer.email}</TableCell>
                <TableCell>{order.customer.phone}</TableCell>
                <TableCell>{order.customer.address}</TableCell>
                <TableCell align="left">
                  <div style={{ width: 120, maxWidth: "150px" }}>
                    {order.cart.map((product) => (
                      <Typography key={product.id} variant="body2">
                        {product.title}
                      </Typography>
                    ))}
                  </div>
                </TableCell>
                <TableCell align="center">
                  {order.cart.map((product) => (
                    <Typography key={product.id} variant="body2">
                      {product.quantity}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.timestamp}</TableCell>

                <TableCell>
                  <Tooltip title="Finalizar">
                    <IconButton
                      onClick={() => handleStatusChange(order)}
                      disabled={order.status === "Pagado"}
                      style={
                        order.status === "Pendiente" ? { color: "#00FF00" } : {}
                      }
                    >
                      <DoneAllIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      onClick={() => handleDeleteOrder(order.id)}
                      style={{ color: "red" }}
                    >
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
              handleConfirmOrder(selectedOrder);
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
              handleConfirmDelete(selectedOrder);
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
