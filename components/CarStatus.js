import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

import { useAppContext } from "@/context/AppState";

import {
  formatPosixTimestamp,
  formatStringTimestamp,
  formatDurationString,
} from "../utils/utils";

import { setFcmToken } from "@/firebase/setFcmToken";

import styles from "@/styles/CarStatus.module.css";

export default function CarStatus() {
  const { database, auth, user, setUser } = useAppContext();

  const [carStatus, setCarStatus] = useState(null);

  const [notifications, setNotifications] = useState(false);

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

  async function subscribe() {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        setFcmToken(user.uid);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            subscribe();
          }
        });
      }
    }
  }

  useEffect(() => {
    if ("Notification" in window) {
      setNotifications(true);
    }

    const unsub = onSnapshot(
      doc(database, "car_status", "current"),
      (snapshot) => {
        if (snapshot.exists()) {
          setCarStatus(snapshot.data());
        } else {
          console.log("No data available");
        }
      }
    );

    return () => {
      unsub();
    };
  }, [database]);

  return (
    <div className={styles.carStatusContainerBackground}>
      <div className={styles.carStatusContainer}>
        {carStatus !== null && (
          <>
            <p>
              Батерия: {carStatus.battery.level}% (
              {formatStringTimestamp(carStatus.battery.updated_at)})
            </p>
            <p>Прогноза: {carStatus.battery.autonomy} км</p>
            <p>Километраж: {carStatus.odometer} км</p>
            <p>
              Позиция:{" "}
              <a
                href={
                  "https://maps.google.com/maps?q=" +
                  carStatus.position.latitude +
                  "," +
                  carStatus.position.longitude
                }
                target="_blank"
              >
                Google Maps
              </a>{" "}
              ({formatStringTimestamp(carStatus.position.updated_at)})
            </p>
            <p>Температура на въздуха: {carStatus.environment.air_temp}&deg;</p>
            {carStatus.battery.charging.plugged ? (
              <>
                <p>
                  Състояние на зареждане: {carStatus.battery.charging.status}
                </p>
                {carStatus.battery.charging.status != "Stopped" && (
                  <>
                    <p>
                      Оставащо време:{" > "}
                      {formatDurationString(
                        carStatus.battery.charging.remaining_time
                      )}
                    </p>
                    <p>
                      Скорост на зареждане: {carStatus.battery.charging.rate}{" "}
                      км/ч
                    </p>
                  </>
                )}
                <p>Режим на зареждане: {carStatus.battery.charging.mode}</p>
              </>
            ) : (
              <>
                <p>Навън е: {carStatus.environment.day ? "светло" : "тъмно"}</p>
                <p>Състояние на движение: {carStatus.ignition}</p>
              </>
            )}
            <p>&nbsp;</p>
            <p>Обновено на {formatPosixTimestamp(carStatus.timestamp)}</p>
          </>
        )}
        <p>
          {notifications && (
            <>
              <button
                onClick={(e) => {
                  subscribe();
                }}
              >
                Включи известия
              </button>
            </>
          )}
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
