const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const { runPythonScript, parseOutputFromPythonScript } = require("../util/helper");
const { pythonScripts } = require("../util/constants");

const api = express();

const functionRegion = "europe-west3";

api.use(cors({ origin: true }));

api.get("/getAllBulbs", async (req, res) => {
  const result = await runPythonScript(pythonScripts.discoverBulbs);
  return res.json(parseOutputFromPythonScript(result));
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
  const { flowID } = req.params;
  const test = await runPythonScript(pythonScripts.discoverBulbs);
  console.log(test);
  // const ips = (await runPythonScript(pythonScripts.discoverBulbs)).map(bulb => bulb.ip);
  // const result = await runPythonScript(pythonScripts[flowID], ...ips);
  // return res.json(result);
});

api.post("/setRGB/:ip/:red/:green/:blue", async (req, res) => {
  const { ip, red, green, blue } = req.params;
  const result = await runPythonScript(pythonScripts.setRGB, ip, red, green, blue);
  return res.json(result);
});

module.exports = {
  api: functions.region(functionRegion).https.onRequest(api),
};
