"use strict";

const admin = require("firebase-admin");
const serviceAccount = require("./credentials-firebase.json");
const { api } = require("./handlers/http");
const functions = require("firebase-functions");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// REST Handler
exports.api = api;

exports.garbageCollector = functions.firestore.document("temperatures/{id}").onCreate(async () => {
  console.log("Start deleting");
  const db = admin.firestore();
  const timestamp = new Date();
  timestamp.setHours(0, 0, 0, 0);
  const querySnapshot = await db
    .collection("temperatures")
    .where("timestamp", "<=", Math.round(timestamp.getTime() / 1000))
    .get();
  const deletePromises = [];
  querySnapshot.forEach((doc) => {
    console.log("Deleting doc %s", doc.ref.id);
    deletePromises.push(doc.ref.delete());
  });
  return Promise.all(deletePromises);
});
