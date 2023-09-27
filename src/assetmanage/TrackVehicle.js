import React, { useState } from 'react';

function VehicleTrackingSystem() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // In a real system, you would make an API request to get the vehicle's location.
    // For this example, let's assume a dummy location.
    const dummyLocation = { lat: 37.7749, lng: -122.4194 };

    if (!map) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: dummyLocation,
        zoom: 8,
      });
      setMap(map);
    }

    if (marker) {
      marker.setMap(null);
    }

    const newMarker = new window.google.maps.Marker({
      position: dummyLocation,
      map: map,
      title: `Vehicle ${vehicleNumber}`,
    });
    setMarker(newMarker);

    map.setCenter(dummyLocation);
  };

  return (
    // <div>
    //   <h1>Vehicle Tracking System</h1>
    //   <form onSubmit={handleFormSubmit}>
    //     <label htmlFor="vehicle-number">Enter Vehicle Number:</label>
    //     <input
    //       type="text"
    //       id="vehicle-number"
    //       value={vehicleNumber}
    //       onChange={(e) => setVehicleNumber(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Track Vehicle</button>
    //   </form>
    //   <div id="map" style={{ height: '400px', width: '100%' }}></div>
    // </div>

<div className="tracking-card">
  <div className="tracking-card-header">
    <h1 className="tracking-title">Vehicle Tracking System</h1>
  </div>
  <div className="tracking-card-content">
    <form onSubmit={handleFormSubmit} className="tracking-form">
      <label htmlFor="vehicle-number" className="tracking-label">
        Enter Vehicle Number:
      </label>
      <input
        type="text"
        id="vehicle-number"
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
        className="tracking-input"
        required
      />
      <button type="submit" className="tracking-button">
        Track Vehicle
      </button>
    </form>
    <div id="map" className="tracking-map"></div>
  </div>
</div>


  );
}

export default VehicleTrackingSystem;
