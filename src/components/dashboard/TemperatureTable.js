import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import Snackbar from "../snackbar";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  loadingIndicator: {
    margin: "auto",
  },
}));

const LoadingIndicator = (props) => {
  return (
    <React.Fragment>
      <div className={props.classes.loadingIndicator}>
        <CircularProgress />
      </div>
    </React.Fragment>
  );
};

const TemperatureTableComponent = ({ classes, data }) => {
  const [temperaturesToBeDisplayed, setTemperaturesToBeDisplayed] = useState(10);
  const [snackbarState, setSnackbarState] = useState({
    shouldBeOpen: false,
    message: "",
  });
  const slicedData = data.slice(data.length - temperaturesToBeDisplayed, data.length).reverse();
  const loadMoreTemperatures = () => {
    if (data.length === temperaturesToBeDisplayed) {
      setSnackbarState({
        shouldBeOpen: true,
        message: "All temperatures have been already loaded!",
      });
    }
    setTemperaturesToBeDisplayed((prevState) => (prevState + 10 > data.length ? data.length : prevState + 10));
  };
  return (
    <React.Fragment>
      <Title>Recent Temperatures ({slicedData.length})</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Device</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="right">Temperature (°C)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slicedData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{moment.unix(row.timestamp).format("HH:mm:ss")}</TableCell>
              <TableCell>Raspberry Pi</TableCell>
              <TableCell>Klara-Siebert-Straße 8</TableCell>
              <TableCell align="right">{row.temperature}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={loadMoreTemperatures}>
          See old temperatures
        </Link>
        <Snackbar state={{ snackbarState, setSnackbarState }} />
      </div>
    </React.Fragment>
  );
};

export default function TemperatureTable({ isFetching, data }) {
  const classes = useStyles();
  return isFetching ? (
    <LoadingIndicator classes={classes} />
  ) : (
    <TemperatureTableComponent classes={classes} data={data} />
  );
}
