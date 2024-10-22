import { useState, useEffect } from "react";

import {
  getOrdersRequest,
  updateStatusRequest,
  deleteOrderRequest,
} from "../../api/orders.api";
import { updateStockRequest } from "../../api/products.api";

import OrdersTable from "./ui/OrdersTable";
import {
  Empty,
  LoadingSpinner,
  SuccessAlert,
  WarningAlert,
  ErrorScreen,
} from "../ui/alerts/index.js";

const OrdersManagement = ({ theme }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessages, setSuccessMessages] = useState([]);
  const [warningMessages, setWarningMessages] = useState([]);
  const [error, setError] = useState(null);

  const handleConfirmOrder = async (orderToUpdate) => {
    try {
      const updateStatusResponse = await updateStatusRequest(orderToUpdate.id);
      const updateStockResponse = await updateStockRequest(orderToUpdate);

      if (updateStatusResponse) {
        const updatedOrders = orders.map((order) =>
          order.id === orderToUpdate.id ? { ...order, status: "Pagado" } : order
        );
        setOrders(updatedOrders);
        setSuccessMessages((prevMessages) => [
          ...prevMessages,
          updateStatusResponse.message,
        ]);
      } else {
        setWarningMessages((prevMessages) => [
          ...prevMessages,
          "El estado de la orden no pudo ser actualizado",
        ]);
      }
      if (updateStockResponse) {
        setSuccessMessages((prevMessages) => [
          ...prevMessages,
          updateStockResponse.message,
        ]);
      } else {
        setWarningMessages((prevMessages) => [
          ...prevMessages,
          "El stock no pudo ser actualizado",
        ]);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleConfirmDelete = async (orderId) => {
    try {
      const response = await deleteOrderRequest(orderId);
      if (response.status === 204) {
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
        })
        .catch((error) => {
          setError(error);
        });
    }
    setLoading(false);
  }, [loading, error]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  if (!orders || orders.length === 0) {
    return <Empty message="Aun no hay ordenes cargadas." />;
  }

  return (
    <>
      {successMessages &&
        successMessages.length > 0 &&
        successMessages.map((msg, index) => (
          <SuccessAlert key={index} message={msg} />
        ))}
      {warningMessages && warningMessages.length > 0 && (
        <WarningAlert message={warningMessages} />
      )}

      <OrdersTable
        theme={theme}
        orders={orders}
        handleConfirmOrder={handleConfirmOrder}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};

export default OrdersManagement;
