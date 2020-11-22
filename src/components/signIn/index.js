import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import GoogleButton from "react-google-button";
import firebase from "firebase/app";
import "firebase/auth";

import Copyright from "../copyright";
import Snackbar from "../snackbar";

const signInWithGoogle = () => {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleSignInButton: {
    margin: "auto",
    marginTop: "10px",
  },
}));

export default function SignInSide({ setUserWantsToSignUp }) {
  const classes = useStyles();
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarState, setSnackbarState] = useState({
    shouldBeOpen: false,
    message: "",
  });
  const signInWithEmailAndPassword = async (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(mailAddress, password)
      .catch((err) => {
        setSnackbarState({
          shouldBeOpen: true,
          message: err.message,
        });
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} elevation={6}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setMailAddress(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signInWithEmailAndPassword}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setUserWantsToSignUp(true)}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <GoogleButton className={classes.googleSignInButton} onClick={signInWithGoogle} />
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          <Snackbar state={{ snackbarState, setSnackbarState }} />
        </div>
      </Grid>
    </Grid>
  );
}
