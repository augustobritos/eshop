import { firestore } from "../config/firebase.js";
import { FieldValue } from "firebase-admin/firestore";

const saveOrder = async (req, res, next) => {
  const { customer, cart, total, status } = req.body;

  try {
    const ordersCollection = firestore.collection("orders");
    
    const docRef = await ordersCollection.add({
      customer,
      cart,
      total,
      status,
      timestamp: FieldValue.serverTimestamp()
    });
    res.json(docRef.id);
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

    const ordersWithIds = ordersCollection.docs.map((doc) => {
      const orderData = doc.data();
      orderData.id = doc.id; 
      return orderData;
    });
    res.status(200).json({ orders: ordersWithIds }); 
  } catch (error) {
    console.error("Error getting orders:", error);
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  const { id } = req.params;

  try {
    const orderRef= firestore.collection("orders").doc(id);

    await orderRef.update({
      status: "Pagado"
    });
    return res.json({ message: "Estado de orden actualizado exitosamente." }).status(200);
  } catch (error) {
    console.error("Error al actualizar estado de la orden:", error);
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  console.log("deleteOrder");
  try {
    const { id } = req.params;
    console.log(id);
    const orderRef = firestore.collection("orders").doc(id);
    const doc = await orderRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "La orden no existe." });
    }

    await orderRef.delete();

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    next(error);
  }
};

export { saveOrder, getOrders, updateOrderStatus, deleteOrder };