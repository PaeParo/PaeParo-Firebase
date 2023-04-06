import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const firestore = admin.firestore();
const firestoreUserRef = firestore.collection("users");

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

export const createUser = functions.https.onCall(async (data, context) => {
    try {
        const userId = data.user_id
        const user = data.user;
        const newUserRef = firestoreUserRef.doc(userId);
        await newUserRef.set(user);
        return { success: true, userId: newUserRef.id };
    } catch (error) {
        return { success: false, error };
    }
});

