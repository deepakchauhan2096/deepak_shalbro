import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, withGoogleMap, Marker, Circle } from "react-google-maps";
import { LoadScript } from "@react-google-maps/api";
import locationIcon from "../assests/images/location.png";

const ProjectLoc = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [latitude2, setLatitude2] = useState(28.3903);
  const [longitude2, setLongitude2] = useState(77.05);

  const [locationName, setLocationName] = useState("");
  const [circleCenter, setCircleCenter] = useState([null, null]);
  const [circleRadius, setCircleRadius] = useState(500); // Default radius of the circle in meters
  const [isInsideCircle, setIsInsideCircle] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [suggestedLocations, setSuggestedLocations] = useState([]);

  const circleRef = useRef();

 

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setCircleCenter([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          fetchLocationName(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchLocationName = async (lat, lon) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyCLpjHrEXsS2HVPdlB8lZihxg8YBreB9Yk`;
      const response = await fetch(url);
      const data = await response.json();
      const address = data.display_name;
      setLocationName(address);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleCircleRadiusChange = (event) => {
    const radius = parseFloat(event.target.value);
    if (!isNaN(radius) && radius >= 0) {
      setCircleRadius(radius);
    }
  };

  useEffect(() => {
    if (latitude2 && longitude2 && circleCenter[0] && circleCenter[1]) {
      const distanceFromCircleCenter = calculateDistance(
        latitude2,
        longitude2,
        circleCenter[0],
        circleCenter[1]
      );

      setIsInsideCircle(distanceFromCircleCenter <= circleRadius);
    }
  }, [latitude, longitude, circleCenter, circleRadius]);

  useEffect(() => {
    updateMapLocation();
  }, [locationName]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const phi1 = toRad(lat1);
    const phi2 = toRad(lat2);
    const deltaPhi = toRad(lat2 - lat1);
    const deltaLambda = toRad(lon2 - lon1);

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const handleUserLocationChange = (event) => {
    const inputValue = event.target.value;
    setUserLocation(inputValue);
    updateLocationName(inputValue);
    updateLocationSuggestions(inputValue);
  };

  const updateLocationName = (location) => {
    setLocationName(location);
  };

  const updateLocationSuggestions = async (inputValue) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        inputValue
      )}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      const locations = data.map((item) => item.display_name);
      setSuggestedLocations(locations);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleGetCurrentLocation = () => {
    getLocation();
    setUserLocation("");
  };

  const updateMapLocation = () => {
    if (locationName && locationName !== "") {
      const locationUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        locationName
      )}&format=json`;
      fetch(locationUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setLatitude(data[0].lat);
            setLongitude(data[0].lon);
            setCircleCenter([data[0].lat, data[0].lon]);
          }
        })
        .catch((error) => {
          console.error("Error fetching location:", error);
        });
    }
  };


  console.log(circleCenter, "circle center")


  const WrappedMap = withGoogleMap(() => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: latitude || 0, lng: longitude || 0 }}
    >
      {latitude && longitude && (
        <Marker position={{ lat: latitude, lng: longitude }} />
      )}
      {latitude2 && longitude2 && (
        <Marker position={{ lat: latitude2, lng: longitude2 }} />
      )}

      

      {circleCenter[0] && circleCenter[1] && (
      <Circle
                  defaultCenter={{
                    lat: circleCenter[0],
                    lng: circleCenter[1]
                  }}
                  radius={circleRadius}
                  options={{strokeColor: "#ff0000"}}
                  ref={circleRef}
                />
                )}
    </GoogleMap>
  ));

  return (
    <div className="container-fluid g-0">
      <div className="row">
        <div className="col-12">
          <div>
            <table className="table table-bordered table-fixed table-sm">
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "30%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Property</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {latitude && longitude && (
                  <tr>
                    <td>Latitude</td>
                    <td>{latitude}</td>
                    <td>Longitude</td>
                    <td>{longitude}</td>
                  </tr>
                )}
                {locationName && (
                  <tr>
                    <td>Location Name</td>
                    <td colSpan="3">{locationName}</td>
                  </tr>
                )}
                {latitude && longitude && circleCenter[0] && circleCenter[1] && (
                  <tr>
                    <td>Selected Circle Center - Latitude</td>
                    <td>{circleCenter[0]}</td>
                    <td>Selected Circle Center - Longitude</td>
                    <td>{circleCenter[1]}</td>
                  </tr>
                )}
                {latitude && longitude && circleCenter[0] && circleCenter[1] && (
                  <tr>
                    <td>Circle Radius (in meters)</td>
                    <td>
                      <input
                        type="text"
                        value={circleRadius}
                        onChange={handleCircleRadiusChange}
                        className="form-control form-control-2"
                      />
                    </td>
                    <td>Your location is</td>
                    <td>{isInsideCircle ? "inside" : "outside"} the circle.</td>
                  </tr>
                )}
                <tr>
                  <td>Enter Location</td>
                  <td>
                    <input
                      type="text"
                      value={userLocation}
                      onChange={handleUserLocationChange}
                      list="suggestedLocations"
                      className="form-control form-control-2"
                    />
                  </td>
                  <td>Get Current Location</td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={handleGetCurrentLocation}>
                      Get Current Location
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            {latitude && longitude && (
              <>

                <LoadScript googleMapsApiKey="AIzaSyCLpjHrEXsS2HVPdlB8lZihxg8YBreB9Yk">
                  <WrappedMap
                    containerElement={<div style={{ height: "400px" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                  />
                </LoadScript>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLoc;
