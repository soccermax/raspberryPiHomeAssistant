import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { secondaryListItems } from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Bulb from "./Bulb";
import TemperatureTable from "./TemperatureTable";
import Copyright from "../copyright";
import firebase from "firebase/app";
import "firebase/database";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import LayersIcon from "@material-ui/icons/Layers";
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import CircularProgress from "@material-ui/core/CircularProgress";

const drawerWidth = 240;

const PAGES = {
  TEMPERATURES: "temperatureChart",
  BULBS: "bulbs",
  VACUUM: "vacuum"
};

const Logout = ({ classes }) => {
  const auth = firebase.auth();
  return (
    auth.currentUser && (
      <Button variant="contained" className={classes.logoutButton} onClick={() => auth.signOut()}>
        Logout
      </Button>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  logoutButton: {
    marginLeft: 30,
    marginRight: 30
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  container2: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  container3: {
    marginTop: 100,
    paddingTop: 100
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  fixedHeightBulbs: {
    height: 530
  },

  loadingIndicator: {
    margin: "auto"
  }
}));

const TemperaturesComponent = ({ classes, fixedHeightPaper, isFetching, temperaturesState }) => {
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Temperatures Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart isFetching={isFetching} chartData={temperaturesState}/>
          </Paper>
        </Grid>
        {/* Current Temperature */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits isFetching={isFetching} currentTemperature={temperaturesState[temperaturesState.length - 1]}/>
          </Paper>
        </Grid>
        {/* Temperature Table */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TemperatureTable isFetching={isFetching} data={temperaturesState}/>
          </Paper>
        </Grid>
      </Grid>
      <Grid container
            direction="row"
            justify="center"
            alignItems="flex-end">
        <Grid item xs={12}>
          <Box pt={4}>
            <Copyright/>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const LoadingIndicator = () => {
  return (
    <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ height: "100%" }}>
      <Grid align="center" item xs={12} md={4} lg={3}>
        <CircularProgress/>
      </Grid>
    </Grid>);
};

const Bulbs = ({ classes, fixedHeightPaper, isFetching, bulbs, setBulbs, isFetchingBulbs }) => {
  if (isFetchingBulbs) {
    return <LoadingIndicator/>;
  }
  return (
    <Container maxWidth="lg" className={classes.container2}>
      <Grid container spacing={3} direction="row" alignItems="center" justify="center">
        {/* Bulbs */}
        {bulbs.length > 0 &&
        bulbs.map((bulb) => {
          return (
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Bulb isFetching={isFetching} bulb={bulb} setBulbs={setBulbs}/>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Box pt={4}>
        <Copyright/>
      </Box>
    </Container>
  );
};

const getBulbs = async () => {
  const result = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/getAllBulbs`);
  return result.data;
};

export default function Dashboard({ user }) {
  const classes = useStyles();
  const db = firebase.firestore();
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(PAGES.TEMPERATURES);
  const [bulbs, setBulbs] = React.useState([]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperBulbs = clsx(classes.paper, classes.fixedHeightBulbs);

  const [isFetching, setIsFetching] = useState(true);
  const [isFetchingBulbs, setIsFetchingBulbs] = useState(true);
  const [temperaturesState, setTemperaturesState] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const temperaturesData = [];
      let counter = 0;
      const temperaturesSnapshot = await db.collection("temperatures").orderBy("timestamp").get();
      temperaturesSnapshot.forEach((doc) => {
        temperaturesData.push({
          ...doc.data(),
          time: counter++
        });
      });
      setTemperaturesState(temperaturesData);
      setTimeout(() => setIsFetching(false), 1000);
      const allBulbs = process.env.NODE_ENV === "production" ? [] : await getBulbs();
      setIsFetchingBulbs(false);
      setBulbs(() => allBulbs);
      db.collection("temperatures")
        .where("timestamp", ">", temperaturesData[temperaturesData.length - 1].timestamp)
        .onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            const newTemperaturesData = [];
            newTemperaturesData.push({
              ...change.doc.data(),
              time: counter++
            });
            setTemperaturesState((prevState) => [...prevState, ...newTemperaturesData]);
          });
        });
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon/>
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <Logout classes={classes}/>
          <Avatar alt="Remy Sharp" src={user.photoURL}/>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <List>
          <div>
            <ListItem button onClick={() => setCurrentPage(() => PAGES.TEMPERATURES)}>
              <ListItemIcon>
                <DashboardIcon/>
              </ListItemIcon>
              <ListItemText primary="Temperatures"/>
            </ListItem>
            <ListItem disabled={process.env.NODE_ENV === "production" ? true : false} button
                      onClick={() => setCurrentPage(() => process.env.NODE_ENV === "production" ? PAGES.TEMPERATURES : PAGES.BULBS)}>
              <ListItemIcon>
                <EmojiObjectsIcon/>
              </ListItemIcon>
              <ListItemText primary="Bulbs"/>
            </ListItem>
            <ListItem disabled={process.env.NODE_ENV === "production" ? true : false} button>
              <ListItemIcon>
                <LayersIcon/>
              </ListItemIcon>
              <ListItemText primary="Vacuum"/>
            </ListItem>
          </div>
        </List>
        <Divider/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        {currentPage === PAGES.TEMPERATURES && (
          <TemperaturesComponent
            classes={classes}
            fixedHeightPaper={fixedHeightPaper}
            isFetching={isFetching}
            temperaturesState={temperaturesState}
          />
        )}
        {currentPage === PAGES.BULBS && (
          <Bulbs
            classes={classes}
            fixedHeightPaper={fixedHeightPaperBulbs}
            isFetching={isFetching}
            bulbs={bulbs}
            setBulbs={setBulbs}
            isFetchingBulbs={isFetchingBulbs}
          />
        )}
      </main>
    </div>
  );
}
