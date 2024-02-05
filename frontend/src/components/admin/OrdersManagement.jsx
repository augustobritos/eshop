import { useState, useEffect } from "react";
import {
  getOrdersRequest,
  updateStatusRequest,
  deleteOrderRequest,
} from "../../api/orders.api";
import OrdersTable from "./ui/OrdersTable";
import { CircularProgress } from "@material-ui/core";

const OrdersManagement = ({ theme }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUpdateStatus = async (orderId) => {
    try {
      await updateStatusRequest(orderId);
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: "Pagado" } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelete = async (orderId) => {
    try {
      await deleteOrderRequest(orderId);
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loading && !error) {
      getOrdersRequest()
        .then(({ data }) => {
          setOrders(data.orders);
          console.log(data.orders);
          if (data.orders && data.orders.timestamp) {
            const { _seconds, _nanoseconds } = data.orders.timestamp;
            const milliseconds =
              _seconds * 1000 + Math.round(_nanoseconds / 1000000);
            const date = new Date(milliseconds);
            console.log(date.toString());
          } else {
            console.error(
              "Timestamp data is undefined or not in the expected format"
            );
          }
        })
        .catch((error) => {
          setError(error);
        });
    }
    setLoading(false);
  }, [loading, error]);

  if (loading) {
    return <CircularProgress style={{ margin: "auto" }} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>No orders yet.</div>;
  }

  return (
    <OrdersTable
      theme={theme}
      orders={orders}
      handleUpdateStatus={handleUpdateStatus}
      handleConfirmDelete={handleConfirmDelete}
    />
  );
};

export default OrdersManagement;
