import { firestore } from "../config/firebase.js";

const createProduct = async (req, res, next) => {
  const { title, description, price, quantity, image } = req.body;

  try {
    const docRef = firestore.collection("products").doc();

    await docRef.set({
      title,
      description,
      price,
      quantity,
      image,
    });

    res.json(docRef.id);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getProducts = async (req, res) => {
  try {
    const snapshot = await firestore.collection("products").get();
    const products = snapshot.docs.map((doc) => {
      const id = doc.id;
      const data = doc.data();
      return { id, ...data }; // Include document ID in each product object
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).send("Error getting products");
  }
};

const getProductById = async (req, res) => {
  try {
    const productRef = firestore.collection("products").doc(req.params.id);
    const doc = await productRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Product not found" });
    }
    const productData = doc.data();

    res.status(200).json({
      id: doc.id,
      description: productData.description,
      image: productData.image,
      price: productData.price,
      quantity: productData.quantity,
      title: productData.title,
    });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;

    const productRef = firestore.collection("products").doc(id);
    await productRef.update({
      title: title,
      description: description,
      price: price,
      image: image,
    });

    return res.json({ message: "Producto actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const productRef = firestore.collection("products").doc(id);
    const doc = await productRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "El producto no existe." });
    }

    await productRef.delete();

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
