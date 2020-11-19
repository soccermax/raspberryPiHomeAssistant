import React from "react";
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
  return (
    <React.Fragment>
      <Title>Recent Temperatures (10)</Title>
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
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{moment.unix(row.timestamp).format("HH:mm:ss")}</TableCell>
              <TableCell>Raspberry Pi</TableCell>
              <TableCell>Max sein übel nices zimmer</TableCell>
              <TableCell align="right">{row.temperature}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}></div>
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
