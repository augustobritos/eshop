import { firestore } from "../config/firebase.js";
import bcrypt from "bcrypt";
import createAccessToken from "../libs/jwt.js";
import md5 from "md5"

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const gravatar = "https://www.gravatar.com/avatar/" + md5(email);

    // Store user data in Firestore
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

    return res.json({ id: userRef.id, name, email, gravatar });
  } catch (error) {
    if (error.code === "2305") {
      return res.status(400).json({ message: "El mail ya existe." });
    }
    next(error);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const usersRef = firestore.collection("users");
  const query = usersRef.where("email", "==", email);
  const snapshot = await query.get();

  if (snapshot.empty) {
    return res.status(400).json({ message: "El email no existe." });
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  const validPassword = await bcrypt.compare(password, userData.password);

  if (!validPassword) {
    return res.status(400).json({ message: "La contraseña es incorrecta." });
  }

  const token = await createAccessToken({ id: userDoc.id });

  res.cookie("token", token, {
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 24 * 1000,
  });

  return res.json(userData);
};

const signOut = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Signed out successfully." });
};

const getProfile = async (req, res) => {
  const userRef = firestore.collection("users").doc(req.userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    return res.status(404).json({ message: "User not found." });
  }

  return res.json(userDoc.data());
};

const updateProfile = async (req, res) => {
  const user = req.body;
  try {
    const userRef = firestore.collection("users").doc(req.userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found." });
    }

    await userRef.update(user);

    return res.json({ message: "User profile updated successfully." });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ message: "Failed to update user profile." });
  }
};

const getEnabledPayments = async (req, res) => {
  const userRef = firestore.collection("payments").doc("enabled");
  const userDoc = await userRef.get();
  
  if (!userDoc.exists) {
    return res.status(404).json({ message: "Document not found." });
  }

  return res.json(userDoc.data());
}

const updateEnabledPayments = async (req, res) => {
  try {
    const userRef = firestore.collection("payments").doc("enabled");
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "Document not found." });
    }

    await userRef.update(req.body);

    return res.json({ message: "Payments updated successfully." });
  } catch (error) {
    console.error("Error updating payments:", error);
    return res.status(500).json({ message: "Failed to update payments." });
  }
}

export { signUp, signIn, signOut, getProfile, updateProfile, getEnabledPayments, updateEnabledPayments };
