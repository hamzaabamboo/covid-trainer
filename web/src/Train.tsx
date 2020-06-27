import React, {
  useMemo,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
// import { useAccelerometer } from "./useAccelerometer";
import { useCovidSummary } from "./useCovidSummary";
import { useRouteMatch, useHistory, Redirect } from "react-router-dom";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { UserContext } from "./UserProvider";
import { usePushupCounter } from "./usePushupCounter";
import { firestore } from "firebase";

export const Train: React.FC = () => {
  // const sensorData = useAccelerometer();
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [playState, setState] = useState<"idle" | "playing" | "done">("idle");
  const { data, loading } = useCovidSummary();

  const { params } = useRouteMatch<{ country: string }>();

  const [count] = usePushupCounter(playState === "playing");

  const countryData = useMemo(
    () => data?.Countries.find((e) => e.CountryCode === params.country),
    [data, params.country]
  );

  const start = () => {
    navigator.vibrate([250, 10, 250, 10, 250, 10]);
    setState("playing");
  };
  const onFinishPushup = useCallback(
    (reps: number) => {
      if (reps < 1) {
        history.push("/");
        return;
      } else {
        if (user && countryData) {
          firestore()
            .collection("reps")
            .add({
              user: user?.uid,
              country: countryData?.Country,
              countryCode: countryData?.CountryCode,
              reps,
              timestamp: firestore.FieldValue.serverTimestamp(),
              completed: reps === countryData?.NewConfirmed,
            })
            .then(() => {
              setState("done");
            });
        }
      }
    },
    [user, countryData, history]
  );

  useEffect(() => {
    if (playState === "playing" && count === countryData?.NewConfirmed) {
      navigator.vibrate([250, 10, 250, 10, 250, 10]);
      onFinishPushup(count);
    }
  }, [playState, count, countryData]);

  const page: React.ReactNode = useMemo(() => {
    switch (playState) {
      case "idle":
        return loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <h1 className="text-4xl font-bold">You are challenging</h1>
            <h1 className="md:text-6xl text-5xl font-bold">
              {countryData?.Country} !!!
            </h1>
            <h3 className="text-xl ">
              <span className="font-bold">{countryData?.NewConfirmed}</span>{" "}
              cases
            </h3>
            <h5 className="text-l ">
              Place the phone on the back of your neck and press the big button
            </h5>
            <div className="p-4 w-full">
              <button
                className="bg-red-500 p-4 rounded-md shadow-md my-2 text-3xl h-64 w-full"
                onClick={() => start()}
              >
                Let's go !
              </button>
            </div>
          </>
        );
      case "playing":
        return (
          <>
            <h1 className="md:text-4xl text-3xl ">
              You pushed up <span className="font-bold text-6xl">{count}</span>{" "}
              times
            </h1>
            {user?.level === "h" && (
              <button
                className="bg-red-500 p-4 rounded-md shadow-md my-2 text-2xl"
                onClick={() => onFinishPushup(countryData?.NewConfirmed || 0)}
              >
                Press to Push up {countryData?.NewConfirmed} times
              </button>
            )}
            <button
              className="bg-red-500 p-4 rounded-md shadow-md my-2 text-2xl"
              onClick={() => onFinishPushup(count)}
            >
              Give Up
            </button>
          </>
        );
      case "done":
        return (
          <>
            <h1 className="text-3xl font-bold">Congratulations</h1>
            <h1 className="md:text-4xl text-3xl ">
              You pushed up{" "}
              <span className="font-bold">{countryData?.NewConfirmed} !</span>{" "}
              times
            </h1>
            <button
              className="bg-red-500 p-2 rounded-md shadow-md my-2 "
              onClick={() => history.push("/")}
            >
              Go back home to challenge more Countries
            </button>
          </>
        );
    }
  }, [playState, countryData, loading, count, user, history, onFinishPushup]);

  if (params.country === "") {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center text-center">
      {page}
    </div>
  );
};
