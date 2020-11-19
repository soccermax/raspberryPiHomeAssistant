import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  loadingIndicator: {
    margin: "auto",
  },
}));

const LoadingIndicator = (props) => {
  return (
    <div className={props.classes.loadingIndicator}>
      <CircularProgress />
    </div>
  );
};

export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <LoadingIndicator classes={classes} />
        </Grid>
      </Grid>
    </div>
  );
}
