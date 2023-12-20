import { createContext, useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import firebase_app from "@/firebase/config";

const AppContext = createContext();

export default function AppWrapper({ children }) {
  const auth = getAuth(firebase_app);
  const database = getFirestore(firebase_app);

  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        auth,
        database,
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
