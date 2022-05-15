import { useEffect, useState, useCallback } from "react";
import { getSummary, ISummaryData } from "../api";

export const useCovidSummary = () => {
  const [data, setData] = useState<ISummaryData>();
  const [loading, setLoading] = useState(false);

  const update = useCallback(() => {
    if (!loading) {
      setLoading(true);
      getSummary().then((res) => {
        setLoading(false);
        setData(res.data);
      });
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    getSummary().then((res) => {
      setLoading(false);
      setData(res.data);
    });
  }, []);

  return { data, update, loading };
};
