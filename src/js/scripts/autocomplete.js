import {
  getResponse
} from "./api";
export const useAutocomplete = () => {
  const placesOptions = {
    appId: "pl58FNVF6UP2",
    apiKey: "e431d60fe4e979e236ef9cd6fd0c9e3d",
    container: document.getElementById("input"),
    templates: {
      value: function (suggestion) {
        return suggestion.name;
      },
    },
  };
  const reconfigurableOptions = {
    type: "city",
    aroundLatLngViaIP: false,
  };
  const placesInstance = places(placesOptions).configure(reconfigurableOptions);


};