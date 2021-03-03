const GOOGLE_API_KEY = "AIzaSyAYv1k4RCCtrmLquai1czZSykAb3tudfBU";

export async function getAdressFromCoords(coords) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch address. Please try again!");
  }
  const data = await response.json();
  if (data.error_message) {
    //throw new Error(data.error_message);
    const address = "279 Bedford Ave, Brooklyn, NY 11211, USA";
    return address; //This was set to override billing issues should throw a error instead.
  }
  const address = data.results[0].formatted_address;
  return address;
}

export async function getCoordsFromAdress(adress) {
  const urlAdress = encodeURI(adress);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAdress}&key=${GOOGLE_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coordinates. Please try again!");
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
}
