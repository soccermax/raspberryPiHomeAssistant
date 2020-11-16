import React, {useState, useEffect} from "react";
import {useTheme} from "@material-ui/core/styles";
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer} from "recharts";
import Title from "./Title";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
    loadingIndicator: {
        margin: "auto",
    },
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

const ChartComponent = ({theme, data}) => {
    return (
        <React.Fragment>
            <Title>Today</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary}/>
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label angle={270} position="left"
                               style={{textAnchor: "middle", fill: theme.palette.text.primary}}>
                            Temperature (°C)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="temperature" stroke={theme.palette.primary.main} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};

export default function Chart({isFetching, chartData}) {
    const classes = useStyles();
    const theme = useTheme();

    return isFetching ? <LoadingIndicator classes={classes}/> : <ChartComponent theme={theme} data={chartData}/>;
}
