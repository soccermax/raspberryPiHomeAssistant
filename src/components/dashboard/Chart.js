import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from "recharts";
import Title from "./Title";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

const useStyles = makeStyles(() => ({
  loadingIndicator: {
    margin: "auto"
  }
}));

const formatDate = ({ timestamp }) => {
  return moment.unix(timestamp).format("HH:mm:ss");
};

const LoadingIndicator = (props) => {
  return (
    <React.Fragment>
      <div className={props.classes.loadingIndicator}>
        <CircularProgress/>
      </div>
    </React.Fragment>
  );
};

const ChartComponent = ({ theme, data }) => {
  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data.map(row => {
            row.date = formatDate(row);
            return row;
          })}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary}/>
          <YAxis stroke={theme.palette.text.secondary}>
            <Label angle={270} position="left" style={{ textAnchor: "middle", fill: theme.palette.text.primary }}>
              Temperature (°C)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="temperature" stroke={theme.palette.primary.main} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default function Chart({ isFetching, chartData }) {
  const classes = useStyles();
  const theme = useTheme();

  return isFetching ? <LoadingIndicator classes={classes}/> : <ChartComponent theme={theme} data={chartData}/>;
}
