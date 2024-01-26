import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../../database/dev-splicer-412313-b0749b215bc7.json" assert { type: "json" };

// Initialize Firebase Admin SDK
const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
});

// Get Firestore instance
const firestore = getFirestore(firebaseApp);

export { firestore };
