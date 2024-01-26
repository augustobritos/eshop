// SDK de Mercado Pago
import { MercadoPagoConfig } from "mercadopago";
import { Preference } from "mercadopago";
import config from "../config/index.js";

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: config.MP.ACCESS_TOKEN });

const createPreference = (req, res, next) => {
  const cart = req.body;
  let items = [];

  cart.forEach((item) => {
    items.push({
      id: item.id,
      title: item.title,
      description: item.description,
      picture_url: item.image,
      category_id: "Luxury",
      quantity: Number(item.quantity),
      currency_id: "ARS",
      unit_price: Number(item.price),
    });
  });

  try {
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
          /*
          payer: {
            name: "Agus",
            surname: "Brit",
            email: "ab@mail.com",
            phone: {area_code: "351", number: "8656727"},
            identification: {type: "ID", number: "999874656", identification: 999874656},
            address: {street_name: "Bv Street", street_number: 777, zip_code: "07001"}
          }*/
        },
      })
      .then((data) => {
        const { id } = data;

        if (id) {
          return res
            .send({
              id,
            })
            .status(204);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    if (error) {
      return res.status(500).json({
        message: "Some shit happened",
      });
    }
    console.error(error);
    next(error);
  }
};

export { createPreference };
