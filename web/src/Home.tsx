import React, { useState, useEffect, useMemo } from "react";
import { getSummary, ISummaryData } from "./api";
import { useWindowsSize } from "./useWindowSize";

export const Home: React.FC<{}> = () => {
  const [data, setData] = useState<ISummaryData>();
  const [filterText, setFilterText] = useState<string>("");
  const size = useWindowsSize();
  const filteredCountryList = useMemo<ISummaryData["Countries"]>(() => {
    return (
      data?.Countries.filter((contry) =>
        Object.values(contry).join(" ").includes(filterText)
      ) ?? []
    );
  }, [filterText, data]);

  useEffect(() => {
    getSummary().then((res) => setData(res.data));
  }, []);

  const loading = <p>Loading...</p>;
  const countries = filteredCountryList.map((country) => {
    return (
      <li key={country.CountryCode}>
        {country.Country} ({country.CountryCode}) : {country.NewConfirmed} cases
      </li>
    );
  });

  return (
    <div className="flex w-screen min-h-screen justify-center items-center flex-col">
      <h1 className="text-6xl">Covid Trainer !!!</h1>
      <p className="text-l text-bold">
        width: {size?.width}, height: {size?.height}
      </p>
      <input
        className={`border-solid border-2 rounded border-gray-600 ${
          !data ? "bg-gray-400" : ""
        }`}
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      {data !== undefined ? (
        <>
          <p className="text-3xl text-bold">
            Global cases, {data?.Global.TotalConfirmed}
          </p>
          <ul>{countries}</ul>
        </>
      ) : (
        loading
      )}
    </div>
  );
};
