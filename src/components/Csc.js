import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Csc() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const apiKey = 'AIzaSyCLpjHrEXsS2HVPdlB8lZihxg8YBreB9Yk'; // Replace with your Google API Key

  useEffect(() => {
    // Fetch a list of countries from the Google Places API
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=country&types=(regions)&key=${apiKey}`
      )
      .then((response) => {
        if (response.data.predictions) {
          const countryNames = response.data.predictions.map(
            (prediction) => prediction.description
          );
          setCountries(countryNames);
        }
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch states when a country is selected
    if (selectedCountry) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${selectedCountry} state&types=(regions)&key=${apiKey}`
        )
        .then((response) => {
          if (response.data.predictions) {
            const stateNames = response.data.predictions.map(
              (prediction) => prediction.description
            );
            setStates(stateNames);
          }
        })
        .catch((error) => {
          console.error('Error fetching states:', error);
        });
    } else {
      // Clear the state selection when no country is selected
      setStates([]);
      setSelectedState('');
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Fetch cities when a state is selected
    if (selectedState) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${selectedState} city&types=(regions)&key=${apiKey}`
        )
        .then((response) => {
          if (response.data.predictions) {
            const cityNames = response.data.predictions.map(
              (prediction) => prediction.description
            );
            setCities(cityNames);
          }
        })
        .catch((error) => {
          console.error('Error fetching cities:', error);
        });
    } else {
      // Clear the city selection when no state is selected
      setCities([]);
      setSelectedCity('');
    }
  }, [selectedState]);

  return (
    <div>
      <div>
        <label>Select Country:</label>
        <select
          onChange={(e) => setSelectedCountry(e.target.value)}
          value={selectedCountry}
        >
          <option value="">Select a country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select State:</label>
        <select
          onChange={(e) => setSelectedState(e.target.value)}
          value={selectedState}
        >
          <option value="">Select a state</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select City:</label>
        <select
          onChange={(e) => setSelectedCity(e.target.value)}
          value={selectedCity}
        >
          <option value="">Select a city</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Csc;
