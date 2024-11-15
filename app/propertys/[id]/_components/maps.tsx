"use client"
import React, { useState, useEffect } from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const Map: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false)

  const containerStyle = {
    width: "100%",
    height: "300px",
  }

  const center = {
    lat: -23.55052, // Coordenada de exemplo (São Paulo)
    lng: -46.633308, // Coordenada de exemplo (São Paulo)
  }

  const markerPosition = {
    lat: -23.55052,
    lng: -46.633308,
  }

  useEffect(() => {
    setMapLoaded(true)
  }, [])

  return (
    <div className="p-6">
      {mapLoaded ? (
        <LoadScript googleMapsApiKey="AIzaSyAsv1WHPnFja282T6xAgPelMCF6ZU1hR6U">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        </LoadScript>
      ) : (
        <p>Carregando mapa...</p>
      )}
    </div>
  )
}

export default Map
