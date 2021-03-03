import { Map } from "./UI/Map";
class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);
    const headerTitleEl = document.querySelector("header h1");
    headerTitleEl.textContent = address;
  }
}

const url = new URL(location.href);
const queryParameters = url.searchParams;
const coords = {
  lat: parseFloat(queryParameters.get("lat")),
  lng: parseFloat(queryParameters.get("lng")),
};
const address = queryParameters.get("address");
new LoadedPlace(coords, address);
