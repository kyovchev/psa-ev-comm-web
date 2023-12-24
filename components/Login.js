import { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import { useAppContext } from "@/context/AppState";

import styles from "@/styles/Login.module.css";

export default function Login() {
  const { auth } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function login() {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    <div className={styles.loginFormBackground}>
      <div className={styles.loginForm}>
        <div className={styles.formRow}>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoFocus
          ></input>
        </div>
        <div className={styles.formRow}>
          <label htmlFor="password">Парола: </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <button
          className={styles.loginButton}
          onClick={(e) => {
            login();
          }}
        >
          Вход
        </button>
        {error}
      </div>
    </div>
  );
}
