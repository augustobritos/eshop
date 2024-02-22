import { firestore } from "../config/firebase.js";

const createProduct = async (req, res, next) => {
  try {
    const { title, price, quantity, category, description, images } = req.body;
    const docRef = firestore.collection("products").doc();

    await docRef.set({
      title,
      price,
      quantity,
      category,
      description,
      images,
    });

    res
      .status(200)
      .json({ id: docRef.id, message: "Producto creado correctamente." });
  } catch (error) {
    console.error("Error creando el producto: ", error);
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const snapshot = await firestore.collection("products").get();
    const products = snapshot.docs.map((doc) => {
      const id = doc.id;
      const data = doc.data();
      return { id, ...data };
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error obteniendo los productos:", error);
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productRef = firestore.collection("products").doc(req.params.id);
    const doc = await productRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Product not found" });
    }
    const productData = doc.data();

    res.status(200).json({
      id: doc.id,
      title: productData.title,
      price: productData.price,
      quantity: productData.quantity,
      description: productData.description,
      category: productData.category,
      images: productData.images,
    });
  } catch (error) {
    console.error("Error obteniendo el producto:", error);
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { title, price, quantity, category, description, images } = req.body;
    const id = req.params.id;

    const productRef = firestore.collection("products").doc(id);
    await productRef.update({
      title: title,
      price: price,
      quantity: quantity,
      description: description,
      category: category,
      images: images,
    });

    return res
      .status(200)
      .json({ message: "Producto actualizado correctamente." });
  } catch (error) {
    console.error("Error actualizando producto:", error);
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Producto ID incorrecto." });
    }

    const productRef = firestore.collection("products").doc(id);
    const doc = await productRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "El producto no existe." });
    }

    await productRef.delete();

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error eliminando el producto:", error);
    next(error);
  }
};

const updateStock = async (req, res, next) => {
  try {
    const { cart } = req.body;
    const batch = firestore.batch();

    for (const product of cart) {
      const productId = product.id;
      const productRef = firestore.collection("products").doc(productId);

      // Get the current quantity of the product from the database
      const doc = await productRef.get();

      // Check if the document exists before accessing its data
      if (!doc.exists) {
        console.error(`Document for product ID ${productId} not found.`);
        continue; // Skip this product and move to the next one
      }

      const currentQuantity = doc.data().quantity;

      // Calculate the new quantity after subtracting from the cart
      const newQuantity = currentQuantity - product.quantity;

      // Update the stock of the product by subtracting from the quantity in the database
      batch.update(productRef, { quantity: newQuantity });
    }

    await batch.commit();

    res.status(200).json({ message: "Stock actualizado correctamente." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
};
