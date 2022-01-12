import React from "react";
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Spin } from "antd";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const containerStyle = {
  width: "720px",
  height: "300px",
};

const center = {
  lat: 47.922607468670684,
  lng: 35.15485298489101,
};

const libraries = ["drawing", "places"];

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
  });
  return (
    <div>
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <Autocomplete>
            <input
              type="text"
              placeholder="Input"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px",
                top: "2%",
              }}
            />
          </Autocomplete>
          <></>
        </GoogleMap>
      ) : (
        <Spin />
      )}
    </div>
  );
}

export default Map;
