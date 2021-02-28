import { Modal } from "./UI/Modal";

class PlaceFinder {
  constructor() {
    const adressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler);
    adressForm.addEventListener("submit", this.userAdressHandler);
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
            long: successResult.coords.longitude,
          };
          console.log(coordinates);
        },
        (error) => {
          modal.hide();
          alert("Could not locate you, please enter adress manually");
        }
      );
    }, 1000);
  }
  userAdressHandler() {}
}

const placeFinder = new PlaceFinder();
