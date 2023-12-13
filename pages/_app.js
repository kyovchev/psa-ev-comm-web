import AppState from "@/context/AppState";

import "@/styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AppState>
        <Component {...pageProps} />
      </AppState>
    </>
  );
}
