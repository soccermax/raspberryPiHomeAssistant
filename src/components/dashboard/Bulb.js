import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import CircularProgress from "@material-ui/core/CircularProgress";
import Image from "material-ui-image";
import { ColorPicker } from "material-ui-color";
import Slider from "@material-ui/core/Slider";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
    marginTop: 50
  },
  loadingIndicator: {
    margin: "auto"
  },
  seeMore: {
    marginTop: theme.spacing(3)
  },
  TypographyTest: {
    paddingTop: 100
  },
  Link: {
    marginLeft: 60
  },
  titleTypo: {
    marginBottom: 10
  },

  brightnessTypo: {
    marginTop: 10
  }
}));

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const LoadingIndicator = (props) => {
  return (
    <React.Fragment>
      <div className={props.classes.loadingIndicator}>
        <CircularProgress/>
      </div>
    </React.Fragment>
  );
};

const toogleBulb = async (ip, action, setBulbs) => {
  const result = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/turn${action}Bulb/${ip}`);
  setBulbs((prevValue) => {
    const bulb = prevValue.find((bulb) => bulb.ip === ip);
    bulb.capabilities.power = action === "On" ? "on" : "off";
    return [...prevValue];
  });
  return result.data;
};

const setBrightnessBulb = async (ip, brightness, setBulbs) => {
  const result = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/setBrightness/${ip}/${brightness}`);
  setBulbs((prevValue) => {
    const bulb = prevValue.find((bulb) => bulb.ip === ip);
    bulb.capabilities.bright = brightness;
    return [...prevValue];
  });
  return result.data;
};

const setRGB = async (ip, red, green, blue, setBulbs) => {
  const result = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/setRGB/${ip}/${red}/${green}/${blue}`);
  setBulbs((prevValue) => {
    const bulb = prevValue.find((bulb) => bulb.ip === ip);
    bulb.capabilities.rgb = `${red}${green}${blue}`;
    return [...prevValue];
  });
  return result.data;
};

const BulbComponent = ({ classes, bulb, setBulbs }) => {
  let timeout;
  const [brightness, setBrightness] = React.useState(bulb.capabilities.bright);
  const [brightnessSlider, setBrightnessSlider] = React.useState(bulb.capabilities.bright);
  const [color, setColor] = React.useState(`#${parseInt(bulb.capabilities.rgb).toString(16)}`);
  console.log(parseInt(bulb.capabilities.rgb).toString(16));
  const handleChangeSlider = (event, newValue) => {
    setBrightnessSlider(newValue);
  };

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setBrightness(newValue);
    setBrightnessBulb(bulb.ip, newValue, setBulbs);
  };

  const handleColorPick = (color) => {
    setColor(color.value);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      setRGB(bulb.ip, ...color.rgb, setBulbs);
    }, 1000);
  };

  return (
    <React.Fragment>
      <Title>Xiaomi Yeelight Smart Bulb</Title>
      <Typography className={classes.titleTypo} component="p" variant="h5">
        {`Power status: ${bulb.capabilities.power === "off" ? "Off" : "On"}`}
      </Typography>
      <Image src="https://www.binkupon.com/wp-content/uploads/2019/11/yeelight_new2019.jpg"/>
      {/*<Image src="https://img.gkbcdn.com/s3/p/2020-04-08/Xiaomi-Yeelight-YLDP13YL-Smart-Light-Bulb-White-901306-.jpg" />*/}
      {/*<Image src="https://img.gkbcdn.com/s3/p/2018-05-26/xiaomi-yeelight-yldp05yl-smart-led-bulb-white-1571973174771.jpg" />*/}
      <Typography className={classes.brightnessTypo} id="continuous-slider" gutterBottom>
        Brightness
      </Typography>
      <Slider
        value={brightnessSlider}
        onChange={handleChangeSlider}
        onChangeCommitted={handleChange}
        aria-labelledby="continuous-slider"
      />
      <div>
        <ColorPicker value={color} onChange={handleColorPick}/>
      </div>
      <div className={classes.seeMore}>
        <Typography className={classes.root}>
          <Link
            href="#"
            onClick={() => toogleBulb(bulb.ip, bulb.capabilities.power === "off" ? "On" : "Off", setBulbs)}
          >
            {`Turn bulb ${bulb.capabilities.power === "off" ? "on" : "off"}`}
          </Link>
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default function Bulb({ isFetching, bulb, setBulbs }) {
  const classes = useStyles();
  return isFetching ? (
    <LoadingIndicator classes={classes}/>
  ) : (
    <BulbComponent bulb={bulb} setBulbs={setBulbs} classes={classes}/>
  );
}
