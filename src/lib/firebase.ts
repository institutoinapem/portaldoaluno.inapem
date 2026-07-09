import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// AS CHAVES DO LADO ESQUERDO PRECISAM SER EXATAMENTE ESSAS (CAMELCASE)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Rastreamento Sniper no console para validação
console.log("DEBUG INAPEM - Project ID enviado:", firebaseConfig.projectId);
console.log("DEBUG INAPEM - API Key enviada:", firebaseConfig.apiKey ? "OK (Preenchida)" : "ERRO (Vazia)");

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { doc, setDoc };