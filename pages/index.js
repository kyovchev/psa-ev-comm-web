import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";

import styles from "../styles/Home.module.css";

import { useAppContext } from "@/context/AppState";
import Login from "@/components/Login";
import CarStatus from "@/components/CarStatus";

export default function Home() {
  const { auth, user, setUser } = useAppContext();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, setUser]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Peugeot Status</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {loading ? (
          <p>Зареждане...</p>
        ) : user ? (
          <CarStatus></CarStatus>
        ) : (
          <Login></Login>
        )}
      </main>
    </div>
  );
}
