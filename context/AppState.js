import { createContext, useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import firebase_app from "@/firebase/config";

const AppContext = createContext();

export default function AppWrapper({ children }) {
  const database = getFirestore(firebase_app);
  const auth = getAuth(firebase_app);
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        database,
        auth,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
