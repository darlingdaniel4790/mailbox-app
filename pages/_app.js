import ResponsiveAppBar from "../components/ResponsiveAppBar";
import "../styles/globals.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { ContextProvider } from "../store";

const firebaseConfig = {
  apiKey: "AIzaSyB5v5U2hlXAEC0Q5OSxj1tzFu4IQ7vjFqY",
  authDomain: "mbl-mailbox-app.firebaseapp.com",
  projectId: "mbl-mailbox-app",
  storageBucket: "mbl-mailbox-app.appspot.com",
  messagingSenderId: "367466878523",
  appId: "1:367466878523:web:524bc3aa1db374c520ae1e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ContextProvider>
        <ResponsiveAppBar />
        <Component {...pageProps} />
      </ContextProvider>
    </>
  );
}

export default MyApp;
