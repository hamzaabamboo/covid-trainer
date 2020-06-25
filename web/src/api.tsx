import axios from "axios";

const client = axios.create({
  baseURL: "https://api.covid19api.com/",
});

export interface ISummaryData {
  Global: {
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
  };
  Countries: {
    Country: string;
    CountryCode: string;
    Slug: string;
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
    Date: Date;
  }[];
}
export const getSummary = () => {
  return client.get<ISummaryData>("/summary");
};
