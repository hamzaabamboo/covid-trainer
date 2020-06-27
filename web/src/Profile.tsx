import React, { useContext, useMemo } from "react";
import { UserContext } from "./UserProvider";
import { firestore } from "firebase";
import { useFirestoreQuery } from "./useFirestore";
import { IReps } from "./Leaderboard";
import { CardItem } from "./components/CardItem";
import { LoadingSpinner } from "./components/LoadingSpinner";

export const Profile: React.FC = () => {
  const { user, signOut } = useContext(UserContext);
  const repsRef = useMemo(
    () =>
      user?.uid
        ? firestore()
            .collection("reps")
            .where("user", "==", user?.uid)
            .orderBy("timestamp", "desc")
        : undefined,
    [user]
  );
  const [sessions, sessionLoading] = useFirestoreQuery<IReps>(repsRef);

  return (
    <div className="min-h-full w-screen flex flex-col justify-center items-center ">
      {user && (
        <div className="max-w-md p-4 pt-8">
          <img
            src={user.photo}
            className="rounded-full w-32"
            alt="profilepic"
          />
          <h1 className="text-4xl">{user.name}</h1>
          <button
            className="p-4 bg-red-500 rounded-md text-xl"
            onClick={signOut}
          >
            Roggu Auto
          </button>
          <h1 className="text-2xl py-2">Past Training Sessions</h1>
          {!sessionLoading ? (
            sessions?.map((session) => {
              return (
                <CardItem key={session.id}>
                  {session.country} ({session.countryCode}) : {session.reps}{" "}
                  reps
                </CardItem>
              );
            })
          ) : (
            <LoadingSpinner />
          )}
        </div>
      )}
    </div>
  );
};
