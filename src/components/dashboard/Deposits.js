import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  loadingIndicator: {
    margin: "auto",
  },
});

const formatDate = ({ timestamp }) => {
  return moment.unix(timestamp).format("LLLL");
};

const LoadingIndicator = (props) => {
  return (
    <React.Fragment>
      <div className={props.classes.loadingIndicator}>
        <CircularProgress />
      </div>
    </React.Fragment>
  );
};

const DepositsComponent = ({ currentTemperature, classes }) => {
  return (
    <React.Fragment>
      <Title>Current Temperature</Title>
      <Typography component="p" variant="h4">
        {`${currentTemperature.temperature} °C`}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {formatDate(currentTemperature)}
      </Typography>
    </React.Fragment>
  );
};

export default function Deposits({ isFetching, currentTemperature }) {
  const classes = useStyles();
  return isFetching ? (
    <LoadingIndicator classes={classes} />
  ) : (
    <DepositsComponent currentTemperature={currentTemperature} classes={classes} />
  );
}
