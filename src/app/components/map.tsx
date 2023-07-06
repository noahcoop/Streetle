'use client'
import React, { useState } from 'react'
import { GoogleMap, TransitLayer, useJsApiLoader } from '@react-google-maps/api';
import { Answer } from '../types/answer';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const MIN_ZOOM = 14
const MAX_ZOOM = 16

function Map(props: {
  answer: Answer
}) {
  const [zoom, setZoom] = useState(props.answer.zoom ?? 14)

  const { isLoaded } = useJsApiLoader({
    id: 'streetle-no-label',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  })

  const center = {
    lat: props.answer.lat,
    lng: props.answer.lng
  }

  const zoomIn = () => setZoom(Math.min(zoom + 0.5, MAX_ZOOM))

  const zoomOut = () => setZoom(Math.max(zoom - 0.5, MIN_ZOOM))

  return isLoaded ? (
    <div style={{position: 'relative'}}>
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
      <div style={{position: 'absolute', top: 10, right: 10}}>
      <button onClick={zoomIn} disabled={zoom >= MAX_ZOOM}>Zoom In</button>
      <button onClick={zoomOut} disabled={zoom <= MIN_ZOOM}>Zoom Out</button>
      </div>
      </div>
  ) : <></>
}

export default React.memo(Map)