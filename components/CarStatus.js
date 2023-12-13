import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

import { useAppContext } from "@/context/AppState";

import { formatPosixTimestamp, formatStringTimestamp } from "../utils/utils";

import styles from "@/styles/CarStatus.module.css";

export default function CarStatus() {
  const { database, auth, user, setUser } = useAppContext();

  const [carStatus, setCarStatus] = useState({
    odometer: "-",
    ignition: "-",
    timestamp: "-",
    environment: {
      air_temp: "-",
      day: "-",
    },
    battery: {
      level: "-",
      updated_at: "-",
      charging_mode: "-",
    },
  });

  async function logout() {
    let result = null,
      error = null;
    try {
      result = await signOut(auth);
    } catch (e) {
      error = e;
    }

    setUser(null);
    return { result, error };
  }
  console.log(user);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(database, "car_status", "current"),
      (snapshot) => {
        if (snapshot.exists()) {
          console.log("Document data:", snapshot.data());
          setCarStatus(snapshot.data());
        } else {
          console.log("No data available");
        }
      }
    );

    return () => {
      console.log(unsub);
      unsub();
    };
  }, [database]);

  return (
    <div className={styles.carStatusContainerBackground}>
      <div className={styles.carStatusContainer}>
        <p>
          Батерия: {carStatus.battery.level}% (
          {formatStringTimestamp(carStatus.battery.updated_at)})
        </p>
        <p>Прогноза: {carStatus.battery.autonomy} км</p>
        <p>Километраж: {carStatus.odometer} км</p>
        <p>Температура на въздуха: {carStatus.environment.air_temp}&deg;</p>
        <p>Навън е: {carStatus.environment.day ? "светло" : "тъмно"}</p>
        <p>Състояние на движение: {carStatus.ignition}</p>
        <p>Състояние на зареждане: {carStatus.battery.charging_mode}</p>
        <p></p>
        <p>Обновено на {formatPosixTimestamp(carStatus.timestamp)}</p>
        <p>
          <button
            onClick={(e) => {
              logout();
            }}
          >
            Изход
          </button>
        </p>
      </div>
    </div>
  );
}
