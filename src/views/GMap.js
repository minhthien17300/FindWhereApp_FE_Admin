import React, { useEffect, useRef } from 'react';

const GMap = (posision) => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  useEffect(() => {
    googleMap = initGoogleMap();
    createMarker();
    
    window.google.maps.event.addListener(googleMap, "click", function (e) {

      //lat and lng is available in e object
      var latLng = e.latLng;
      console.log(e.latLng)
  
    });
  }, []);


  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: posision.lat, lng: posision.lng },
      zoom: 15
    });
  }

  // create marker on google map
  const createMarker = () => new window.google.maps.Marker({
    position: { lat: posision.lat, lng: posision.lng },
    map: googleMap
  });

  /* const addMarker = (location, map) => {
    this.setState(prev => ({
      fields: {
        ...prev.fields,
        location
      }
    }));
    map.panTo(location);
  };
 */

  

  return <div
    ref={googleMapRef}
    style={{ width: 1200, height: 500 }}
    //onClick={(t, googleMap, c) => addMarker(c.latLng, googleMap)}
  />
}

export default GMap;