/* import React, { useState, useEffect } from 'react';
import GMap from './GMap';

// API key of the google map
const GOOGLE_MAP_API_KEY = process.env.REACT_APP_API_KEY;

// load google map script
const loadGoogleMapScript = (callback) => {
  if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
}

function Map() {
  const [loadMap, setLoadMap] = useState(false);
  //const [clicks, setClicks] = React.useState<window.google.maps.LatLng>([]);

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true)
    });
  }, []);

  return (
    <div className='content'>
    <div className="App">
      <a>Map</a><br /><br />
      {!loadMap ? <div>Loading...</div> : <GMap />}
    </div>
    </div>
  );
}

export default Map; */