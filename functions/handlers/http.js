const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const { runPythonScript, parseOutputFromPythonScript } = require("../util/helper");
const { pythonScripts } = require("../util/constants");

const api = express();

const functionRegion = "europe-west3";

const mockData = [
  {
    ip: "192.168.0.51",
    port: 55443,
    capabilities: {
      id: "0x0000000012ab15dc",
      model: "color",
      fw_ver: "65",
      support:
        "get_prop set_default set_power toggle set_bright start_cf stop_cf set_scene cron_add cron_get cron_del set_ct_abx set_rgb set_hsv set_adjust adjust_bright adjust_ct adjust_color set_music set_name",
      power: "off",
      bright: "100",
      color_mode: "2",
      ct: "2700",
      rgb: "16254470",
      hue: "0",
      sat: "97",
      name: "",
    },
  },
  {
    ip: "192.168.0.176",
    port: 55443,
    capabilities: {
      id: "0x00000000112c067e",
      model: "color",
      fw_ver: "65",
      support:
        "get_prop set_default set_power toggle set_bright start_cf stop_cf set_scene cron_add cron_get cron_del set_ct_abx set_rgb set_hsv set_adjust adjust_bright adjust_ct adjust_color set_music set_name",
      power: "off",
      bright: "100",
      color_mode: "2",
      ct: "2700",
      rgb: "460767",
      hue: "240",
      sat: "96",
      name: "",
    },
  },
  {
    ip: "192.168.0.115",
    port: 55443,
    capabilities: {
      id: "0x0000000012a89051",
      model: "color",
      fw_ver: "65",
      support:
        "get_prop set_default set_power toggle set_bright start_cf stop_cf set_scene cron_add cron_get cron_del set_ct_abx set_rgb set_hsv set_adjust adjust_bright adjust_ct adjust_color set_music set_name",
      power: "on",
      bright: "100",
      color_mode: "1",
      ct: "2700",
      rgb: "11157568",
      hue: "0",
      sat: "62",
      name: "",
    },
  },
];

api.use(cors({ origin: true }));

api.get("/getAllBulbs", async (req, res) => {
  // const result = await runPythonScript(pythonScripts.discoverBulbs);
  // return res.json(parseOutputFromPythonScript(result));
  return res.json(mockData);
});

api.post("/turnOnBulb/:ip", async (req, res) => {
  const { ip } = req.params;
  const result = await runPythonScript(pythonScripts.turnOnBulb, ip);
  return res.json(result);
});

api.post("/turnOffBulb/:ip", async (req, res) => {
  const { ip } = req.params;
  const result = await runPythonScript(pythonScripts.turnOffBulb, ip);
  return res.json(result);
});

api.post("/setBrightness/:ip/:brightness", async (req, res) => {
  const { ip, brightness } = req.params;
  const result = await runPythonScript(pythonScripts.setBrightness, ip, parseInt(brightness));
  return res.json(result);
});

api.post("/startFlow/:flowId", async (req, res) => {
  const { flowId } = req.params;
  const result = await runPythonScript(pythonScripts[flowId], "192.168.0.176", "192.168.0.51", "192.168.0.115");
  return res.json(result);
});

api.post("/setRGB/:ip/:red/:green/:blue", async (req, res) => {
  const { ip, red, green, blue } = req.params;
  const result = await runPythonScript(pythonScripts.setRGB, ip, red, green, blue);
  return res.json(result);
});

module.exports = {
  api: functions.region(functionRegion).https.onRequest(api),
};
