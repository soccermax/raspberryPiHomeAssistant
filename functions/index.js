"use strict";

const admin = require("firebase-admin");

const serviceAccount = require("./credentials-firebase.json");

const { api } = require("./handlers/http");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// REST Handler
exports.api = api;
