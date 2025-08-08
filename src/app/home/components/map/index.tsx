import { MapContainer, MapPlaceholder } from "./styles";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  MarkerClustererF,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";
import type { Property } from "@/gql/graphql";
import PropertyCardContent from "@/components/property-card/property-card-content";

interface IMapProps {
  properties: Property[];
  isVisible: boolean;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map: React.FC<IMapProps> = ({ properties, isVisible }: IMapProps) => {
  const [selected, setSelected] = useState<Property | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  const initialCenter = useMemo(() => {
    return properties.length
      ? { lat: properties[0].location.lat, lng: properties[0].location.lng }
      : { lat: 6.2442, lng: -75.5812 };
  }, [properties]);

  return (
    <MapContainer $isVisible={isVisible}>
      <MapPlaceholder>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={initialCenter}
            zoom={13}
            onLoad={(map) => setMapRef(map)}
            onClick={() => setSelected(null)}
            options={{
              mapTypeControl: false,
              streetViewControl: false,
            }}
          >
            <MarkerClustererF>
              {(clusterer) => (
                <>
                  {properties.map((property) => (
                    <Marker
                      key={property.id}
                      position={{
                        lat: property.location.lat,
                        lng: property.location.lng,
                      }}
                      clusterer={clusterer}
                      onClick={() => {
                        setSelected(property);
                        mapRef?.panTo({
                          lat: property.location.lat,
                          lng: property.location.lng,
                        });
                      }}
                    />
                  ))}
                </>
              )}
            </MarkerClustererF>

            {selected && (
              <InfoWindow
                key={selected.id}
                position={{
                  lat: selected.location.lat,
                  lng: selected.location.lng,
                }}
                onCloseClick={() => setSelected(null)}
                options={{
                  headerDisabled: true,
                }}
              >
                <div style={{ maxWidth: 250 }}>
                  <PropertyCardContent {...selected} />
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </MapPlaceholder>
    </MapContainer>
  );
};

export default Map;
