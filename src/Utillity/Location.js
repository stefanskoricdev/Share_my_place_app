const GOOGLE_API_KEY = "AIzaSyAYv1k4RCCtrmLquai1czZSykAb3tudfBU";

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
