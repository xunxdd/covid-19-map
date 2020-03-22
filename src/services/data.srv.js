import compareAsc from 'date-fns/compareAsc';
import { cloneDeep } from 'lodash';
import statesAbbrv from '@/assets/json-data/states_abbrv.json';

const cutOffDate = '2/25/20';

const filterByRegion = (data = [], countryRegion = 'US') =>
  data.filter(dt => dt['Country/Region'] === countryRegion);

const getMostRecentCases = data => {
  const keysToExclude = ['Province/State', 'Country/Region', 'Lat', 'Long'];
  const keys = Object.keys(data).filter(key => keysToExclude.indexOf(key) < 0);
  const mostRecent = keys[keys.length - 1]; // temp handling the data
  return parseInt(data[mostRecent]);
};

const addMostRecentRegion = data => {
  return data.map((st) => {
    const sum = getMostRecentCases(st);
    const state = cloneDeep(st);
    state.sum = sum || 0;
    return state;
  });
};

const arraySum = arr => arr.reduce((a, b) => a + b, 0);

const getMaxMin = (statesData = []) => {
  const stateNumbers = statesData.map(state => state.sum);
  const nationalTotal = arraySum(stateNumbers);
  const max = Math.max(...stateNumbers);
  const highestState = statesData.find((st) => st.sum === max);
  return {
    nationalTotal,
    highestState,
    max,
    min: Math.min(...stateNumbers),
    totalStates: statesData.length
  };
};

const getMarker = (data, scale) => {
  const sizeScale = Math.ceil(data.sum / scale) + 2;
  return {
    position: { lat: parseFloat(data.Lat), lng: parseFloat(data.Long) },
    icon: {
      scale: Math.min(sizeScale, 30),
      fillColor: data.sum > 2000 ? 'black' : data.sum > 1000 ? '#404040' : 'red',
      strokeWeight: 2,
      fillOpacity: 1
    },
    sum: data.sum,
    ...data
  };
};

const getUsStates = cases => {
  return cases.filter(itm => {
    const stateName = itm['Province/State'];
    const region = itm['Country/Region'];
    return region === 'US' && stateName.split(',').length === 1;
  });
};


const processData = (cases, scale = 10) => {
  const usCases = getUsStates(cases);

  const states = addMostRecentRegion(usCases);
  return {
    maxMin: getMaxMin(states),
    markers: states.map(st => getMarker(st, scale))
  };
};

const findRegionLatest = (cases, regionName) => {
  const region = cases.find(
    cases =>
      cases['Province/State'] === regionName && cases['Country/Region'] === 'US'
  );

  return region ? getMostRecentCases(region) : 0;
};


const dailyUsTotal = cases => {
  const statesData = getUsStates(cases);
  const keys = Object.keys(statesData[0]);
  const usData = {};
  keys.forEach(key => {
    if (compareAsc(new Date(key), new Date(cutOffDate)) > 0) {
      const numbers = statesData.map(state => parseInt(state[key] || 0, 10));
      usData[key] = arraySum(numbers);
    }
  });

  return usData;
};

const mapData = (confirmed, death, recovered) => {
  const dataItems = [];
  const dataKeys = Object.keys(confirmed);
  dataKeys.forEach(key => {
    const data = {};
    data.date = key;
    data.confirmed = +confirmed[key];
    data.death = +death[key];
    data.recovered = +recovered[key];
    data.active = data.confirmed - data.death - data.recovered;
    dataItems.push(data);
  });

  return dataItems;
};

const getStateData = (cases, stateName) => {
  const data = cases.find(st => st['Province/State'] === stateName);
  const dataClone = cloneDeep(data);
  if (dataClone) {
    delete dataClone['Province/State'];
    delete dataClone['Country/Region'];
    delete dataClone['Lat'];
    delete dataClone['Long'];
  }

  return dataClone;
};

const getCountiesByState = (cases, stateName) => {
  const stateAbrv = statesAbbrv.find(st => st.name === stateName);
  if (!stateAbrv) {
    return [];
  }

  const
    usCases = filterByRegion(cases, 'US');

  return usCases.filter(st => {
    const regionName = st['Province/State'];
    const names = regionName.split(',');

    if (names.length > 1) {
      return stateAbrv.abbreviation === names[1].trim();
    }
  });
};

const customSort = (items, sortBys, isDescs) => {
  const [sortBy] = sortBys;
  const [isDesc] = isDescs;
  items.sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (!isDesc) {
        return compareAsc(dateA, dateB);
      }

      return compareAsc(dateB, dateA);
    }

    if (!isDesc) {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    }

    return b[sortBy] < a[sortBy] ? -1 : 1;
  });

  return items;
};

export const dataSrv = {
  customSort,
  getCountiesByState,
  getUsStates,
  getStateData,
  dailyUsTotal,
  mapData,
  findRegionLatest,
  getMostRecentCases,
  processData,
  filterByRegion,
  addMostRecentRegion,
  getMaxMin
};
