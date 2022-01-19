import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Spin } from "antd";
import Geocode from "react-geocode";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/profile/profileSlice";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
Geocode.setApiKey(API_KEY);

const containerStyle = {
  width: "720px",
  height: "300px",
};

const center = {
  lat: 47.922607468670684,
  lng: 35.15485298489101,
};

function Map() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const dispatch = useDispatch();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  async function handleClick(e) {
    try {
      const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      const response = await Geocode.fromLatLng(coords.lat, coords.lng);
      const address = response.results[1].formatted_address;
      setUserLocation(address);
      setMarkerPosition(coords);
    } catch (error) {
      console.log(`error`, error);
    }
  }

  function handleUpdate() {
    dispatch(updateProfile({ user_location: userLocation }));
  }

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          id="map"
          onClick={handleClick}
        >
          {markerPosition && (
            <Marker position={markerPosition} onClick={handleUpdate} />
          )}
        </GoogleMap>
      ) : (
        <Spin />
      )}
    </div>
  );
}

export default Map;
