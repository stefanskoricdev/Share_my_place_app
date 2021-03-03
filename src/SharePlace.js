import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAdress, getAdressFromCoords } from "./Utillity/Location";
class PlaceFinder {
  constructor() {
    const adressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    adressForm.addEventListener("submit", this.userAdressHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
  }

  async sharePlaceHandler() {
    const sharedLinkInputElement = document.getElementById("share-link");
    if (!navigator.clipboard) {
      sharedLinkInputElement.select();
      return;
    }
    try {
      alert("Copied into clipborad");
      await navigator.clipboard.writeText(sharedLinkInputElement.value);
    } catch (err) {
      console.log(err.message);
    }
  }

  selectPlace(coordinates, address) {
    const map = new Map(coordinates);
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map;
    }
    //This if check is used to see if there is allready stored current position,
    //If yes it will use it from database for example, and if its not it will render
    //new map with new coordinates
    const sharedLinkInputElement = document.getElementById("share-link");
    this.shareBtn.disabled = false;
    sharedLinkInputElement.value = `${
      location.origin
    }/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${
      coordinates.lng
    }`;
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Location feature is not available in your browser. Please use more modern browser or enter your adress manually."
      );
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location. Please wait."
    );
    modal.show();
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        async (successResult) => {
          const coordinates = {
            lat: successResult.coords.latitude,
            lng: successResult.coords.longitude,
          };
          const address = await getAdressFromCoords(coordinates);
          modal.hide();
          this.selectPlace(coordinates, address);
        },
        (error) => {
          modal.hide();
          alert("Could not locate you, please enter adress manually");
        }
      );
    }, 1000);
  }
  async userAdressHandler(event) {
    event.preventDefault();
    const adress = event.target.querySelector("input").value;
    if (!adress || adress.trim().length === 0) {
      alert("Please enter valid adress!");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location. Please wait."
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAdress(adress);
      this.selectPlace(coordinates, address);
    } catch (error) {
      alert(error.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();
