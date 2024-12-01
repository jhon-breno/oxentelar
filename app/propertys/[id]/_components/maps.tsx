"use client"
import React, { useState, useEffect } from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { Property } from "@prisma/client"

const Map: React.FC<{ property: Property }> = ({ property }) => {
  const [coordinates, setCoordinates] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const containerStyle = {
    width: "100%",
    height: "300px",
  }
  interface GeocodeResult {
    geometry: {
      location: {
        lat: number
        lng: number
      }
    }
  }

  interface GeocodeResponse {
    results: GeocodeResult[]
    status: string
  }

  // Função para corrigir o endereço e buscar coordenadas
  const fetchCoordinates = async () => {
    try {
      const address = `${property.street}, ${property.number}, ${property.neighborhood}, ${property.city}, ${property.state}, ${property.postalCod}`
      console.log("Fetching coordinates for address:", address)

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
      )

      const data: GeocodeResponse = await response.json()

      if (data.status === "OK" && data.results.length > 0) {
        const location = data.results[0].geometry.location
        setCoordinates({
          lat: location.lat,
          lng: location.lng,
        })
      } else {
        setError("Endereço não encontrado.")
      }
    } catch (err) {
      setError("Erro ao buscar coordenadas.")
      console.error("Error fetching coordinates:", err)
    }
  }

  // Atualizando as coordenadas sempre que a propriedade mudar
  useEffect(() => {
    if (property) {
      fetchCoordinates()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property]) // Executa quando 'property' mudar

  return (
    <div className="p-6">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : coordinates ? (
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
