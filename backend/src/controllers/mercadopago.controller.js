import { firestore } from "../config/firebase.js";
import { MercadoPagoConfig } from "mercadopago";
import { Preference } from "mercadopago";
import { getMercadoPagoConfig } from "../config/index.js";

const createPreference = async (req, res, next) => {
  const { items, orderId, email } = req.body;
  let cartItems = [];

  items.forEach((item) => {
    cartItems.push({
      id: item.id,
      title: item.title,
      description: item.description,
      picture_url: item.image,
      category_id: "",
      quantity: Number(item.quantity),
      currency_id: "ARS",
      unit_price: Number(item.price),
    });
  });

  try {
    const config = await getMercadoPagoConfig();
    const client = new MercadoPagoConfig({
      accessToken: config.MP.ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    preference
      .create({
        body: {
          auto_return: "approved",
          back_urls: {
            success: "http://localhost:5173/success",
            pending: "http://localhost:5173/pending",
            failure: "http://localhost:5173/failure",
          },
          items: cartItems,
          notification_url:
            "https://southamerica-east1-eshop-412313.cloudfunctions.net/myShop/api/webhooks/mercadopago",
          metadata: { orderId },
          payer: {
            email: email,
          },
        },
      })
      .then((data) => {
        const { id } = data;

        if (id) {
          return res.status(200).json(id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    if (error) {
      return res.status(500).json({
        message: "Something has happened",
      });
    }
    console.error(error);
    next(error);
  }
};

const getMercadoPagoKey = async (req, res, next) => {
  try {
    const config = await getMercadoPagoConfig();
    if (config && config.MP && config.MP.PUBLIC_KEY) {
      console.log(config.MP.PUBLIC_KEY);
      return res.status(200).send(config.MP.PUBLIC_KEY);
    }
  } catch (error) {
    console.error("Error retrieving MercadoPago configuration:", error);
    next(error);
  }
};

const handlePaymentWebhook = async (req, res, next) => {
  try {
    const { data } = req.body;
    const { id } = data;

    if (!id) {
      return res.status(400).json({ error: "Invalid payment data" });
    }

    const paymentDetails = await getPaymentDetails(id);
    if (!paymentDetails) {
      return res.status(404).json({ error: "Payment details not found" });
    }

    const { metadata, status, status_detail } = paymentDetails;
    const orderId = metadata.order_id.id;

    if (status === "approved" && status_detail === "accredited") {
      await updateOrderStatus(orderId, "Pagado");
      return res
        .status(200)
        .json({ message: "Order status updated successfully" });
    } else {
      return res
        .status(500)
        .json({ error: "Payment status not eligible for update" });
    }
  } catch (error) {
    console.error("Error al actualizar estado de la orden:", error);
    next(error);
  }

  res.status(200);
};

const getPaymentDetails = async (id) => {
  try {
    const config = await getMercadoPagoConfig();
    const accessToken = config.MP.ACCESS_TOKEN;

    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = firestore.collection("orders").doc(orderId);

    if (orderRef.exists) {
      throw new Error("Orden no encontrada");
    }

    await orderRef.update({ status: newStatus });
  } catch (error) {
    console.error("Error actualizando el estado de la orden:", error);
    throw error;
  }
};

export { createPreference, getMercadoPagoKey, handlePaymentWebhook };
