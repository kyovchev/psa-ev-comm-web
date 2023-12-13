import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useAppContext } from "@/context/AppState";
import Login from "@/components/Login";
import CarStatus from "@/components/CarStatus";

export default function Home() {
  const { user } = useAppContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>Peugeot Status</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{user ? <CarStatus></CarStatus> : <Login></Login>}</main>
    </div>
  );
}
