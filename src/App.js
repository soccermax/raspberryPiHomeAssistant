import React from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import SignIn from "./components/signIn/index";
import Dashboard from "./components/dashboard/Dashboard";

import { useAuthState } from "react-firebase-hooks/auth";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

//TODO: move to env
firebase.initializeApp({
  apiKey: "AIzaSyC-_LY36jhUJivQv73hA1Nhe8ITA3lqRhE",
  authDomain: "raspberrypihomeassistant-ba207.firebaseapp.com",
  databaseURL: "https://raspberrypihomeassistant-ba207.firebaseio.com",
  projectId: "raspberrypihomeassistant-ba207",
  storageBucket: "raspberrypihomeassistant-ba207.appspot.com",
  messagingSenderId: "775362468335",
  appId: "1:775362468335:web:abe70711ab522695b7be1a",
});

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <section>{user ? <Dashboard /> : <SignIn />}</section>
      </ThemeProvider>
    </div>
  );
}

export default App;
