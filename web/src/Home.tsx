import React, { useState, useEffect, useMemo, useContext } from "react";
import { getSummary, ISummaryData } from "./api";
// import { useWindowsSize } from "./useWindowSize";
import { useLocalStorage } from "./useLocalStorage";
import { Levels, repsData } from "./types";
import { Modal } from "./components/Modal";
import { CardItem } from "./components/CardItem";
import { firestore } from "firebase";
import { UserContext, IUser } from "./UserProvider";
import { useFirestoreDocument } from "./useFirestore";
import { useKey } from "./useKey";

export const formatN = (n: number) => new Intl.NumberFormat("en-us").format(n);
export const Home: React.FC<{}> = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState<ISummaryData>();
  const [filterText, setFilterText] = useState<string>("");
  const [level, setLevel] = useLocalStorage<Levels>("userLevel", null);
  const [, setFirebaseUser] = useFirestoreDocument<IUser>(
    firestore().collection("users").doc(user?.uid)
  );

  const showLevelModal = useMemo(() => {
    if (level === null) {
      return true;
    }
    return false;
  }, [level]);

  // const size = useWindowsSize();
  const filteredCountryList = useMemo<ISummaryData["Countries"]>(() => {
    return (
      data?.Countries.filter((contry) =>
        Object.values(contry).join(" ").includes(filterText)
      ) ?? []
    ).filter((e) => repsData[level ?? "h"]?.(e.NewConfirmed));
  }, [filterText, data, level]);

  useKey("h", () => {
    setLevel("h");
  });
  useEffect(() => {
    if (level !== null && user) {
      setFirebaseUser({ level }, true);
    }
  }, [level, user]);

  useEffect(() => {
    getSummary().then((res) => setData(res.data));
  }, []);

  const loading = <p>Loading...</p>;
  const countries = React.useMemo(() => {
    return filteredCountryList.map((country) => {
      return (
        <CardItem key={country.CountryCode}>
          {country.Country} ({country.CountryCode}) :{" "}
          {formatN(country.NewConfirmed)} cases
        </CardItem>
      );
    });
  }, [filteredCountryList]);

  return (
    <>
      <div
        className="flex w-full min-h-screen justify-center items-center flex-col"
        onKeyDown={(e) => {}}
      >
        <h1 className="text-6xl">Covid Trainer !!!</h1>
        <p className="text-l text-bold">Hello, {user?.name}</p>
        <div>
          Current Level : {level}
          <button
            className={`pl-2 text-red-500 font-bold`}
            onClick={() => setLevel(null)}
          >
            Change
          </button>
        </div>
        <input
          placeholder="Search Me"
          className={`border-solid p-2 border-2 rounded border-gray-600 ${
            !data ? "bg-gray-400" : ""
          }`}
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        {data !== undefined ? (
          <>
            <p className="text-3xl text-bold">
              Global cases : {formatN(data?.Global.TotalConfirmed)}
            </p>
            <div className="max-w-xl">{countries}</div>
          </>
        ) : (
          loading
        )}
      </div>
      {showLevelModal && (
        <Modal title="Select Your Level">
          <div className="w-full flex flex-col lg:flex-row py-2">
            <div
              onClick={() => setLevel("beginner")}
              className="w-full flex flex-col justify-center items-center border-2 border-gray-300 h-24 transition duration-100 transition-all hover:bg-gray-400"
            >
              <h4 className="font-bold">Beginner</h4>
              <h6>(1-20/rep)</h6>
            </div>
            <div
              onClick={() => setLevel("intermediate")}
              className="w-full flex flex-col justify-center items-center border-2 border-gray-300 h-24 transition-all duration-100 hover:bg-gray-400"
            >
              <h4 className="font-bold">Intermediate</h4>
              <h6>(21-60/rep)</h6>
            </div>
            <div
              onClick={() => setLevel("pro")}
              className="w-full flex flex-col justify-center items-center border-2 border-gray-300 h-24 transition-all duration-100 hover:bg-gray-400"
            >
              <h4 className="font-bold">Professional</h4>
              <h6>
                (<span className="text-red-500 font-bold">61+</span>/rep)
              </h6>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
