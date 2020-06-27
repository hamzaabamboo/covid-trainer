import React, { useRef, useMemo } from "react";
import { IUser } from "./UserProvider";
import { firestore } from "firebase";
import { useFirestoreQuery } from "./useFirestore";
import { useUsers } from "./useUsers";
import { CardItem } from "./components/CardItem";
import { LoadingSpinner } from "./components/LoadingSpinner";

export interface IReps {
  country: string;
  countryCode: string;
  id: string;
  reps: number;
  timestamp: firestore.Timestamp;
  user: string;
  completed: boolean;
}
export const Leaderboard: React.FC = () => {
  // const { user } = useContext(UserContext);
  const leaderboardRef = useRef(
    firestore().collection("leaderboard").orderBy("reps", "desc")
  );
  const [_leaderboard] = useFirestoreQuery<IReps>(leaderboardRef.current);
  const usersMap = useUsers();

  const leaderboard: (IUser & { reps: number })[] | undefined = useMemo(() => {
    return _leaderboard
      ? _leaderboard
          .map(({ id, reps }) => ({ ...usersMap[id], reps }))
          .sort((a, b) => a.reps - b.reps)
      : undefined;
  }, [_leaderboard, usersMap]);

  return (
    <div className="min-h-full w-screen flex flex-col justify-start items-center ">
      <div className="max-w-lg  flex flex-col justify-start items-center">
        <h1 className="text-4xl my-4">Leaderboard</h1>
        {leaderboard ? (
          leaderboard?.map((entry, index) => (
            <CardItem key={entry.uid}>
              <div className="w-full flex flex-row">
                <img
                  className="rounded-full h-16 w-auto block mr-4"
                  alt={entry.name}
                  src={entry.photo}
                />
                <div className="w-full">
                  <h4 className="text-l">
                    <span className="font-bold">#{index + 1}</span>{" "}
                    {entry.name ?? entry.uid}
                  </h4>{" "}
                  {entry.reps} reps
                </div>
              </div>
            </CardItem>
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};
