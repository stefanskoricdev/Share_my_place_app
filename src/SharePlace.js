import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAdress } from "./Utillity/Location";
class PlaceFinder {
  constructor() {
    const adressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    adressForm.addEventListener("submit", this.userAdressHandler.bind(this));
  }

  selectPlace(coordinates) {
    const map = new Map(coordinates);
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map;
    }
    //This if check is used to see if there is allready stored current position,
    //If yes it will use it from database for example, and if its not it will render
    //new map with new coordinates
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
        (successResult) => {
          modal.hide();
          const coordinates = {
            lat: successResult.coords.latitude,
            lng: successResult.coords.longitude,
          };
          this.selectPlace(coordinates);
          console.log(coordinates);
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
      this.selectPlace(coordinates);
    } catch (error) {
      alert(error.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();
