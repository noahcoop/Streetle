"use client";
import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Answer } from "../types/answer";
import { Button } from "@mantine/core";

const containerStyle = {
  width: "400px",
  height: "400px",
};

function Map(props: { answer: Answer }) {
  const [zoom, setZoom] = useState(props.answer.zoom ?? 14);

  const MIN_ZOOM = props.answer.zoom ?? 14;
  const MAX_ZOOM = props.answer.zoom ? props.answer.zoom + 2 : 16;

  const { isLoaded } = useJsApiLoader({
    id: "streetle-no-label",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const center = {
    lat: props.answer.lat,
    lng: props.answer.lng,
  };

  const zoomIn = () => setZoom(Math.min(zoom + 0.5, MAX_ZOOM));

  const zoomOut = () => setZoom(Math.max(zoom - 0.5, MIN_ZOOM));

  return isLoaded ? (
    <div style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={{
          gestureHandling: "none",
          disableDefaultUI: true,
          mapTypeId: "satellite",
        }}
      ></GoogleMap>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <Button
          onClick={zoomIn}
          disabled={zoom >= MAX_ZOOM}
          size="xs"
          style={{ fontSize: 18 }}
        >
          +
        </Button>
        <Button
          onClick={zoomOut}
          disabled={zoom <= MIN_ZOOM}
          size="xs"
          style={{ fontSize: 18 }}
        >
          -
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Map);
