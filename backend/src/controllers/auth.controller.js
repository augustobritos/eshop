import { firestore } from "../config/firebase.js";
import bcrypt from "bcrypt";
import createAccessToken from "../libs/jwt.js";
import md5 from "md5";

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const gravatar = "https://www.gravatar.com/avatar/" + md5(email);

    const userRef = await firestore.collection("users").add({
      name: name,
      email: email,
      password: encryptedPassword,
      gravatar: gravatar,
    });

    const token = await createAccessToken({ id: userRef.id });

    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 1000,
    });

    return res.status(200).json({ id: userRef.id, name, email, gravatar });
  } catch (error) {
    console.error("Error al registrarse: ", error);
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const usersRef = firestore.collection("users");
    const query = usersRef.where("email", "==", email);
    const snapshot = await query.get();

    if (snapshot.empty) {
      return res
        .status(400)
        .json({ message: "Los datos ingresados son incorrectos." });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    const validPassword = await bcrypt.compare(password, userData.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Los datos ingresados son incorrectos." });
    }

    const token = await createAccessToken({ id: userDoc.id });

    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 1000,
    });

    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error iniciando sesion:", error);
    next(error);
  }
};

const signOut = (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Signed out successfully." });
  } catch (error) {
    console.error("Error cerrando sesion: ", error);
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userRef = firestore.collection("users").doc(req.userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    return res.status(200).json(userDoc.data());
  } catch (error) {
    console.error("Error obteniendo los datos:", error);
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const user = req.body;
  try {
    const userRef = firestore.collection("users").doc(req.userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    await userRef.update(user);

    return res.json({ message: "Informacion actualizada correctamente." });
  } catch (error) {
    console.error("Error actualizando el perfil:", error);
    next(error);
  }
};

const getEnabledPayments = async (req, res, next) => {
  try {
    const userRef = firestore.collection("payments").doc("enabled");
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "Document not found." });
    }

    return res.status(200).json(userDoc.data());
  } catch (error) {
    console.error("Error obteniendo los metodos de pago: ", error);
    next(error);
  }
};

const updateEnabledPayments = async (req, res, next) => {
  try {
    const userRef = firestore.collection("payments").doc("enabled");
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "Documento no encontrado." });
    }

    await userRef.update(req.body);

    return res
      .status(200)
      .json({ message: "Metodos de pago actualizados correctamente." });
  } catch (error) {
    console.error("Error actualizando los metodos de pago:", error);
    next(error);
  }
};

export {
  signUp,
  signIn,
  signOut,
  getProfile,
  updateProfile,
  getEnabledPayments,
  updateEnabledPayments,
};
