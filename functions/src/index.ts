import * as functions from "firebase-functions";
import { firestore, initializeApp } from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
initializeApp();

export const updateLeaderboard = functions.firestore
  .document("reps/{id}")
  .onCreate(async (snapshot, ctx) => {
    const data = snapshot.data();
    const leaderboardRef = firestore().doc("leaderboard/" + data.user);
    leaderboardRef
      .get()
      .then((s) => {
        console.log(s.data());
        if (s.exists) {
          const currentReps = s.data()?.reps ?? 0;
          leaderboardRef
            .update({
              reps: data.reps + currentReps,
              lastUpdated: firestore.FieldValue.serverTimestamp(),
            })
            .catch(console.log);
        } else {
          leaderboardRef
            .create({
              reps: data.reps,
              lastUpdated: firestore.FieldValue.serverTimestamp(),
            })
            .catch(console.log);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
