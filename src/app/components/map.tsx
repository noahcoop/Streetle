'use client'
import React from 'react'
import { GoogleMap, TransitLayer, useJsApiLoader } from '@react-google-maps/api';
import { Guess } from '../types/guess';

const containerStyle = {
  width: '400px',
  height: '400px'
};

function Map(props: {
  guess: Guess
}) {
  const { isLoaded } = useJsApiLoader({
    id: 'streetle-no-label',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  })

  const center = {
    lat: props.guess.lat,
    lng: props.guess.lng
  }

  const zoom = props.guess.zoom ?? 14

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={{
          gestureHandling: 'none',
          disableDefaultUI: true,
          mapTypeId: 'satellite'
        }}

      >
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)