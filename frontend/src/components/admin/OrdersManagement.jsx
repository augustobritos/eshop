import { useState, useEffect } from "react";

import {
  getOrdersRequest,
  updateStatusRequest,
  deleteOrderRequest,
} from "../../api/orders.api";
import { updateStockRequest } from "../../api/products.api";

import OrdersTable from "./ui/OrdersTable";
import Error from "../ui/Error";
import Loading from "../ui/Loading";
import Warning from "../ui/Warning";

const OrdersManagement = ({ theme }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);

  const handleUpdateStatus = async (orderToUpdate) => {
    try {
      const updateStatusResponse = await updateStatusRequest(orderToUpdate.id);
      const updateStockResponse = await updateStockRequest(orderToUpdate);
      if (updateStatusResponse) {
        const updatedOrders = orders.map((order) =>
          order.id === orderToUpdate.id ? { ...order, status: "Pagado" } : order
        );
        setOrders(updatedOrders);
      } else {
        setWarning("El estado no pudo ser actualizado");
      }
      if (!updateStockResponse) {
        setWarning("El stock no pudo ser actualizado.");
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleConfirmDelete = async (orderId) => {
    try {
      const res = await deleteOrderRequest(orderId);
      if (res) {
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
      }
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
          if (data.orders) {
            data.orders.map((o) => {
              console.log(o.timestamp);
            })
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
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (!orders || orders.length === 0) {
    return <div>Aun no hay ordenes cargadas.</div>;
  }

  return (
    <>
      {warning && <Warning message={warning} />}
      <OrdersTable
        theme={theme}
        orders={orders}
        handleUpdateStatus={handleUpdateStatus}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};

export default OrdersManagement;
