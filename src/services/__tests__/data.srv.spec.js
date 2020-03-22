import { dataSrv } from "../data.srv";
import confirmed from "@/assets/json-data/confirmed.json";
import deaths from "@/assets/json-data/deaths.json";
import recovered from "@/assets/json-data/recovered.json";
import { cloneDeep } from "lodash";

describe("datasrv", () => {
  it("sum", () => {
    const sum = dataSrv.getMostRecentCases(confirmed[0]);
    expect(sum).toBe(75);
  });

  it("maxMin", () => {
    const usCases = dataSrv.filterByRegion(confirmed, "US");
    const states = dataSrv.addMostRecentRegion(usCases);

    const maxMin = dataSrv.getMaxMin(states);

    expect(maxMin).toEqual({
      nationalTotal: 2179,
      max: 568,
      min: 0,
      totalStates: 244
    });
  });

  it("processData", () => {
    const data = dataSrv.processData(confirmed, 0.5);
    expect(data.maxMin).toEqual({
      max: 568,
      min: 1,
      nationalTotal: 2179,
      totalStates: 52
    });
  });

  it("findRegionLatest", () => {
    const data = dataSrv.findRegionLatest(confirmed, "Illinois");
    expect(data).toBe(46);
  });

  it("usTotla", () => {
    const data = dataSrv.dailyUsTotal(deaths);
    console.log(cloneDeep(data));
  });

  it("mapData", () => {
    const confirmedData = dataSrv.getStateData(confirmed, "Washington");
    const deathData = dataSrv.getStateData(deaths, "Washington");
    const recoveredData = dataSrv.getStateData(recovered, "Washington");
    const dataItems = dataSrv.mapData(confirmedData, deathData, recoveredData);
    expect(dataItems[0]).toEqual({
      date: "1/22/20",
      confirmed: 0,
      death: 0,
      recovered: 0,
      active: 0
    });
  });

  it("getCounties", () => {
    const data = dataSrv.getCountiesByState(confirmed, "Illinois");
    console.log(data[0]);
  });
});
