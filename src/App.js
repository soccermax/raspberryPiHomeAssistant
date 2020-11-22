import React, { useState } from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import SignIn from "./components/signIn/index";
import SignUp from "./components/signUp";
import Dashboard from "./components/dashboard/Dashboard";

import { useAuthState } from "react-firebase-hooks/auth";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import LoadingPage from "./components/loadingPage";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

const auth = firebase.auth();

function App() {
  const [user, loading] = useAuthState(auth);
  const [userWantsToSignUp, setUserWantsToSignUp] = useState(false);
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <section>
          {loading ? (
            <LoadingPage />
          ) : user ? (
            <Dashboard user={user} />
          ) : userWantsToSignUp ? (
            <SignUp setUserWantsToSignUp={setUserWantsToSignUp} />
          ) : (
            <SignIn setUserWantsToSignUp={setUserWantsToSignUp} />
          )}
        </section>
      </ThemeProvider>
    </div>
  );
}

export default App;
