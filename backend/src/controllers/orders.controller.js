import { firestore } from "../config/firebase.js";
import { FieldValue } from "firebase-admin/firestore";

const saveOrder = async (req, res, next) => {
  try {
    const { customer, cart, total, status, paymentMethod } = req.body;
    const ordersCollection = firestore.collection("orders");

    const docRef = await ordersCollection.add({
      customer,
      cart,
      total,
      status,
      paymentMethod,
      timestamp: FieldValue.serverTimestamp(),
    });
    res
      .status(200)
      .json({ id: docRef.id, message: "Orden creada correctamente." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const ordersCollection = await firestore
      .collection("orders")
      .orderBy("timestamp", "desc")
      .limit(10)
      .get();

    const ordersWithIdsAndDates = ordersCollection.docs.map((doc) => {
      const orderData = doc.data();
      const date = orderData.timestamp ? orderData.timestamp.toDate() : null;

      const formattedDate = date
        ? date.toLocaleString("es-AR", {
            timeZone: "America/Argentina/Cordoba",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        : null;

      orderData.id = doc.id;
      orderData.timestamp = formattedDate;
      return orderData;
    });
    res.status(200).json({ orders: ordersWithIdsAndDates });
  } catch (error) {
    console.error("Error getting orders:", error);
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderRef = firestore.collection("orders").doc(id);

    await orderRef.update({
      status: "Pagado",
    });
    return res
      .status(200)
      .json({ message: "Estado de la orden actualizado correctamente." });
  } catch (error) {
    console.error("Error al actualizar estado de la orden:", error);
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderRef = firestore.collection("orders").doc(id);
    const doc = await orderRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "La orden no existe." });
    }

    await orderRef.delete();

    return res.status(204);
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    next(error);
  }
};

export { saveOrder, getOrders, updateOrderStatus, deleteOrder };
