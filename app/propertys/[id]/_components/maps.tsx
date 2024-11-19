"use client"
import React, { useState, useEffect } from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { Property } from "@prisma/client"

const Map: React.FC<{ property: Property }> = ({ property }) => {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [coordinates, setCoordinates] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const containerStyle = {
    width: "100%",
    height: "300px",
  }

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const address = `${property.street}, ${property.number}, ${property.neighborhood}, ${property.city}, ${property.state}`
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address,
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        )
        const data = await response.json()
        if (data.results && data.results[0]) {
          const location = data.results[0].geometry.location
          setCoordinates({ lat: location.lat, lng: location.lng })
          setMapLoaded(true)
        } else {
          console.error("Endereço não encontrado")
        }
      } catch (error) {
        console.error("Erro ao buscar as coordenadas:", error)
      }
    }

    fetchCoordinates()
  }, [property])

  return (
    <div className="p-6">
      {mapLoaded && coordinates ? (
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coordinates}
            zoom={15}
          >
            <Marker position={coordinates} />
          </GoogleMap>
        </LoadScript>
      ) : (
        <p>Carregando mapa...</p>
      )}
    </div>
  )
}

export default Map