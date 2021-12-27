import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";
import {
  MapComponent,
  MapComponentContainer,
  SearchBar,
} from "../styles/Map.style";
import logo from "../assets/logo_pinflag.png";
import backArrow from "../assets/back-arrow.svg";
import AddressSave from "./AddressSave";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGluZmxhZyIsImEiOiJja3ZpM3JqemkwMXdrMnZtaHBjNDVkOW5nIn0.s-_0Qw7og1cw0tsubdH8kQ";

let pinflagCoords = [-70.61480652524202, -33.42333621298261];
// Search only in Chile
const limitsBox = [
  -75.633333, //minX
  -53.896306, //minY
  -66.983333, //maxX
  -17.594722, //maxY
];

const Map = ({ url, pickUp, setter, title, subtitle, isPickup }) => {
  //Ref to map items
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [pickUpName, setPickUpName] = useState("Pinflag");
  const [addressData, setAddressData] = useState({});
  const [saveAddressData, setSaveAddressData] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState(false);

  //send address on click
  const handleClick = () => {
    setSaveAddressData(true);

    window.parent.postMessage(
      {
        address: addressData.address,
        number: addressData.number,
        region: addressData.region,
        comuna: addressData.comuna,
      },
      "*"
    );
  };

  const handleBackArrow = () => {
    isPickup(undefined);
  };

  useEffect(() => {
    /* INITIALIZE MAP FUNCTIONS AND CHARACTERISTICS */
    //Initialize Map
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: url,
      center: pinflagCoords,
      zoom: 13,
    });
    //Disable Map rotation
    map.current.dragRotate.disable();

    /* ADD MARKER AND MAKE IT DRAGGABLE */
    //Create a marker
    let marker = new mapboxgl.Marker({
      draggable: true,
      color: "#33cccc",
    });
    //Update a marker for draggable Long and Lat
    const addMarker = (e) => {
      let coordinates = e.lngLat;
      marker.setLngLat(coordinates).addTo(map.current);
    };

    /* USER GEOLOCATION FUNCTIONS */
    //Create Geolocation Controls
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      showAccuracyCircle: false,
      fitBoundsOptions: {
        maxZoom: 15,
      },
      showUserLocation: true,
    });
    //Add Geolocation control to map
    map.current.addControl(geolocate, "bottom-right");
    //Geolocate at map load
    map.current.on("load", () => {
      geolocate.trigger();
    });

    /* SEARCHBAR => GEOCODER FUNCTION */

    //Searchbar Definition
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
      bbox: limitsBox,
      placeholder: "Ingresa tu direccion",
      marker: false,
      limit: 3,
    });

    //Add Searchbar on Map
    document
      .getElementById("geocoder")
      .appendChild(geocoder.onAdd(map.current));

    //Get address on search Result
    geocoder.on("result", (event) => {
      //map.current.getSource('single-point').setData(e.result.geometry);
      geocoder.setInput(event.result.place_name);
      geocoder.setLimit(1);
      setButtonDisplay(true);
    });

    //Only available on delivery
    if (!pickUp) {
      geocoder.on("result", (event) => {
        marker.setLngLat(event.result.geometry.coordinates).addTo(map.current);
        setAddressData({
          address: event.result.text,
          number: event.result.address,
          comuna: event.result.context[2].text,
          region: event.result.context[3].text,
        });

        marker.on("dragend", () => {
          const lngLat = marker.getLngLat();
          axios
            .get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?limit=1&access_token=pk.eyJ1IjoicGluZmxhZyIsImEiOiJja3ZpM3JqemkwMXdrMnZtaHBjNDVkOW5nIn0.s-_0Qw7og1cw0tsubdH8kQ`
            )
            .then((res) => {
              geocoder.setInput(res.data.features[0].place_name);
              geocoder.setLimit(1);
              setAddressData({
                address: res.data.features[0].text,
                number: res.data.features[0].address,
                comuna: res.data.features[0].context[2].text,
                region: res.data.features[0].context[3].text,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    }

    //Marker Avilable only on delivery not in pickUp
    if (!pickUp) {
      map.current.on("click", (event) => {
        addMarker(event);
        setButtonDisplay(true);
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.lngLat.lng},${event.lngLat.lat}.json?limit=1&access_token=pk.eyJ1IjoicGluZmxhZyIsImEiOiJja3ZpM3JqemkwMXdrMnZtaHBjNDVkOW5nIn0.s-_0Qw7og1cw0tsubdH8kQ`
          )
          .then((res) => {
            geocoder.setInput(res.data.features[0].place_name);
            geocoder.setLimit(1);
            setAddressData({
              address: res.data.features[0].text,
              number: res.data.features[0].address,
              comuna: res.data.features[0].context[2].text,
              region: res.data.features[0].context[3].text,
            });
          })
          .catch((err) => {
            console.log(err);
          });

        //Update marker on drag to get Lng-Lat
        marker.on("dragend", () => {
          const lngLat = marker.getLngLat();
          //Reverse Geocoding for get Lng-Lat information
          axios
            .get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?limit=1&access_token=pk.eyJ1IjoicGluZmxhZyIsImEiOiJja3ZpM3JqemkwMXdrMnZtaHBjNDVkOW5nIn0.s-_0Qw7og1cw0tsubdH8kQ`
            )
            .then((res) => {
              geocoder.setInput(res.data.features[0].place_name);
              geocoder.setLimit(1);
              setAddressData({
                address: res.data.features[0].text,
                number: res.data.features[0].address,
                comuna: res.data.features[0].context[2].text,
                region: res.data.features[0].context[3].text,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    }

    //Only available on Pickup
    if (pickUp) {
      map.current.on("click", (event) => {
        // If the user clicked on one of your markers, get its information.
        const features = map.current.queryRenderedFeatures(event.point, {
          layers: ["newest"], // replace with your layer name
        });

        if (!features.length) {
          setter(null);
          geocoder.clear();
          setPickUpName("Pinflag");
          return;
        }

        const feature = features[0];
        setter(feature.properties.id);
        setPickUpName(feature.properties.title);
        geocoder.setInput(
          feature.properties.direction + " " + feature.properties.district
        );
        geocoder.setLimit(1);

        setAddressData({
          address: feature.properties.direction,
          number: "",
          comuna: feature.properties.district,
          region: feature.properties.region,
          pickUpName: feature.properties.title,
        });

        setButtonDisplay(true);
      });
    }

    /* CAMERA CONTROLS*/

    //Fly to position on click event
    map.current.on("click", (event) => {
      map.current.flyTo({
        center: event.lngLat,
        duration: 1000,
        zoom: 15,
      });
    });
  }, [url, pickUp, setter]);

  return (
    <>
      {saveAddressData ? (
        <AddressSave
          isPickup={handleBackArrow}
          addressData={addressData}
          pickUp={pickUp}
        />
      ) : (
        <MapComponentContainer>
          <div className="header">
            <img src={logo} alt="Pinflag-logo-brand" className="brand-logo" />
            <img
              src={backArrow}
              alt="Back to menu button"
              className="back-arrow-btn"
              onClick={handleBackArrow}
            />
          </div>
          <div className="body">
            <span className="text-title">{title}</span>
            <span className="text-subtitle">{subtitle}</span>
          </div>

          {pickUp && (
            <div className="address-box">
              <img src="#" alt="" />
              <span className="address-text">{pickUpName}</span>
            </div>
          )}

          <SearchBar>
            <div id="geocoder" className="geocoder"></div>
            {buttonDisplay && (
              <button className="btn" onClick={handleClick}>
                Enviar
              </button>
            )}
          </SearchBar>
          <MapComponent>
            <div ref={mapContainer} id="map" className="map" />
          </MapComponent>
        </MapComponentContainer>
      )}
    </>
  );
};

export default Map;
