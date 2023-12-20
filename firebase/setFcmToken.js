import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebase_app from "./config";

export function setFcmToken(uid) {
  const database = getFirestore(firebase_app);
  const messaging = getMessaging(firebase_app);
  getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_VAPID,
  })
    .then((currentToken) => {
      if (currentToken) {
        setDoc(doc(database, "fcm", uid), {
          token: currentToken,
        });
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
}
