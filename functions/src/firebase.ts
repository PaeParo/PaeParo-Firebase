/* eslint-disable */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const firestore = admin.firestore();
const firestoreTripUpdateRef = firestore.collection("trip_update");
const firestoreLocationUpdateRef = firestore.collection("location_update");
const firestoreUserRef = firestore.collection("users");
const firestoreTripRef = firestore.collection("trips");
const firestoreEventRef = firestore.collection("events");
const firestorePostRef = firestore.collection("posts");
const firestoreCommentRef = firestore.collection("comments");

export {
    firestore
    , admin
    , functions
    , firestoreTripUpdateRef
    , firestoreLocationUpdateRef
    , firestoreUserRef
    , firestoreTripRef
    , firestoreEventRef
    , firestorePostRef
    , firestoreCommentRef
};