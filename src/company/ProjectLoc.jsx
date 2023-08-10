import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locationIcon from "../assests/images/location.png"

const ProjectLoc = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [latitude2, setLatitude2] = useState(28.3903);
  const [longitude2, setLongitude2] = useState(77.0500);

  const [locationName, setLocationName] = useState('');
  const [circleCenter, setCircleCenter] = useState([null, null]);
  const [circleRadius, setCircleRadius] = useState(500); // Default radius of the circle in meters
  const [isInsideCircle, setIsInsideCircle] = useState(false);
  const [userLocation, setUserLocation] = useState('');
  const [suggestedLocations, setSuggestedLocations] = useState([]);

  const circleRef = useRef();


  const customIcon = new L.Icon({
    iconUrl: locationIcon, // URL to your custom marker icon image
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon (centered at bottom)
  });

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setCircleCenter([position.coords.latitude, position.coords.longitude]);
          fetchLocationName(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetchLocationName = async (lat, lon) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      const address = data.display_name;
      setLocationName(address);
    } catch (error) {
      console.error('Error fetching location:', error);
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
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
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
      console.error('Error fetching location suggestions:', error);
    }
  };

  const handleGetCurrentLocation = () => {
    getLocation();
    setUserLocation('');
  };

  const updateMapLocation = () => {
    if (locationName && locationName !== '') {
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
          console.error('Error fetching location:', error);
        });
    }
  };

  return (
    <div>
      {latitude && longitude && <p>Latitude: {latitude}, Longitude: {longitude}</p>}
      {locationName && <p>Location Name: {locationName}</p>}
      {latitude && longitude && circleCenter[0] && circleCenter[1] && (
        <div>
          <p>Selected Circle Center: Latitude: {circleCenter[0]}, Longitude: {circleCenter[1]}</p>
          <label>
            Circle Radius (in meters):
            <input
              type="text"
              value={circleRadius}
              onChange={handleCircleRadiusChange}
            />
          </label>
          <p>
            Your location is {isInsideCircle ? 'inside' : 'outside'} the circle.
          </p>
        </div>
      )}
      <label>
        Enter Location:
        <input
          type="text"
          value={userLocation}
          onChange={handleUserLocationChange}
          list="suggestedLocations"
        />
      </label>
      <datalist id="suggestedLocations">
        {suggestedLocations.map((location, index) => (
          <option key={index} value={location} />
        ))}
      </datalist>
      <button onClick={handleGetCurrentLocation}>Get Current Location</button>
      {latitude && longitude && (
        <MapContainer key={`${latitude}-${longitude}`} center={[latitude, longitude]} zoom={13} style={{ height: '400px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]} icon={customIcon}>
            <Popup> Company Coverage</Popup>
          </Marker>
          <Marker position={[latitude2, longitude2]} icon={customIcon}>
            <Popup>Your Location</Popup>
          </Marker>
          {circleCenter[0] && circleCenter[1] && (
            <Circle center={circleCenter} radius={circleRadius} ref={circleRef}>
              <Popup>Selected Area</Popup>
            </Circle>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default ProjectLoc;
