"use strict";

const { execFile } = require("child_process");
const { promisify } = require("util");
const path = require("path");

const execFileAsync = promisify(execFile);
const BASE_PATH_SCRIPTS = path.resolve(__dirname, "../", "bin");

const runPythonScript = async (scriptName, ...args) => {
  console.log(scriptName);
  try {
    return (await execFileAsync("python3", [path.resolve(BASE_PATH_SCRIPTS, scriptName), ...args])).stdout;
  } catch (err) {
    console.error(err);
  }
};

const parseOutputFromPythonScript = (rawString) => JSON.parse(rawString.replace(/'/gm, '"'));

module.exports = {
  runPythonScript,
  parseOutputFromPythonScript,
};
