import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getDatabaseconfig } from "../config/index.js";

let firestore;

if (!firestore) {
  getDatabaseconfig()
    .then((data) => {
      const firebaseApp = initializeApp({
        credential: admin.credential.cert(data.DB.CREDENTIALS),
      });
      firestore = getFirestore(firebaseApp);
    })
    .catch((err) => {
      console.error("Error initializing Firebase:", err);
    });
}

export { firestore };
