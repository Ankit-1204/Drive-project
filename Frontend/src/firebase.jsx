import {initializeApp} from "firebase/app"
import {getStorage} from "firebase/storage"
import { getFirestore ,collection}  from "firebase/firestore";

console.log(import.meta.env.VITE_REACT_APP_PROJECT_ID)
const app= initializeApp({
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_APP_ID
})
const firestore= getFirestore(app);

export const database= {
    folder: collection(firestore,'folder'),
    files: collection(firestore,'files')
}

export default app;