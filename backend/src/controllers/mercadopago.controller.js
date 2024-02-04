import { MercadoPagoConfig } from "mercadopago";
import { Preference } from "mercadopago";
import { getMercadoPagoConfig } from "../config/index.js";

const createPreference = async (req, res, next) => {
  const cart = req.body;
  let items = [];

  cart.forEach((item) => {
    items.push({
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
          items,
        },
      })
      .then((data) => {
        const { id } = data;

        if (id) {
          return res.send(id).status(204);
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
      return res.send(config.MP.PUBLIC_KEY).status(204);
    } else {
      return res.status(500).json({
        message: "MercadoPago public key not found",
      });
    }
  } catch (error) {
    console.error('Error retrieving MercadoPago configuration:', error);
    next(error);
  }
}

export { createPreference, getMercadoPagoKey };
