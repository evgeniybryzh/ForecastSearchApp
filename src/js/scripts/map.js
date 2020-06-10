"use strict";
export const useMap = (direction) => {
  let container = L.DomUtil.get("mapid");
  if (container != null) {
    container._leaflet_id = null;
  }

  let mymap;
  mymap = L.map("mapid").setView(direction, 10);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGVwb2pla2EiLCJhIjoiY2tiOWx2eDRuMGZqMjJ4bzRndnUxcDY1NSJ9.Q4KnNwlVBSDCT1lMpucEJA",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 15,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      opacity: 1,
    }
  ).addTo(mymap);

  let marker = L.marker(direction).addTo(mymap);
};
