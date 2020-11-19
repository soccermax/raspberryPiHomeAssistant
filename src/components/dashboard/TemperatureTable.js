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
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  loadingIndicator: {
    margin: "auto"
  }
}));

const LoadingIndicator = (props) => {
  return (
    <React.Fragment>
      <div className={props.classes.loadingIndicator}>
        <CircularProgress/>
      </div>
    </React.Fragment>
  );
};

const TemperatureTableComponent = ({ classes, data, temperaturesToDisplayedState,snackBarOpenState  }) => {
  const {temperaturesToDisplayed, setTemperaturesToDisplayed} = temperaturesToDisplayedState;
  const {snackBarOpen, setOpenSnackBarOpen} = snackBarOpenState;
  const dataToBeDisplayed = data.slice(data.length - temperaturesToDisplayed, data.length);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBarOpen(false);
  };
  const loadMoreTemperatures = () => {
    if (temperaturesToDisplayed + 10 > data.length) {
      temperaturesToDisplayed === data.length && setOpenSnackBarOpen(true)
      return setTemperaturesToDisplayed(data.length);
    }
    setTemperaturesToDisplayed(prevState => prevState + 10);
  };
  return (
    <React.Fragment>
      <Title>Recent Temperatures ({dataToBeDisplayed.length})</Title>
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
          {dataToBeDisplayed.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{moment.unix(row.timestamp).format("HH:mm:ss")}</TableCell>
              <TableCell>Raspberry Pi</TableCell>
              <TableCell>Max sein übel nices zimmer</TableCell>
              <TableCell align="right">{row.temperature}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={loadMoreTemperatures}>
          Load more temperatures
        </Link>
      </div>
            <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message="There are no more temperatures available!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small"/>
            </IconButton>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default function TemperatureTable({ isFetching, data }) {
  const classes = useStyles();
  const [temperaturesToDisplayed, setTemperaturesToDisplayed] = useState(10);
  const [snackBarOpen, setOpenSnackBarOpen] = React.useState(false);
  return isFetching ? (
    <LoadingIndicator classes={classes}/>
  ) : (
    <TemperatureTableComponent classes={classes} data={data}
                               temperaturesToDisplayedState={{temperaturesToDisplayed, setTemperaturesToDisplayed}}
                               snackBarOpenState={{ snackBarOpen, setOpenSnackBarOpen  }}/>
  );
}
