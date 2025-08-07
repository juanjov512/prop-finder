import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMapPin } from "@fortawesome/free-solid-svg-icons";
import { StyledCard, Action, Objective, Location, Footer } from "./styles";
import PropertyCardContent from "./property-card-content";
import { Property } from "@/gql/graphql";

const PropertyCard: React.FC<Property> = React.memo(
  ({ ...property }: Property) => {
    const formatLocation = useCallback((location: Property["location"]) => {
      if (location.city && location.state) {
        return `${location.city}, ${location.state}`;
      } else if (location.city) {
        return location.city;
      } else if (location.state) {
        return location.state;
      }
      return location.country || "Ubicación no disponible";
    }, []);

    return (
      <StyledCard>
        <PropertyCardContent {...property} />
        <Footer>
          <Location>
            <FontAwesomeIcon icon={faMapPin} />
            &nbsp;
            {formatLocation(property.location)}
          </Location>
          <Action>
            <Objective>{property.objective}</Objective>
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
          </Action>
        </Footer>
      </StyledCard>
    );
  }
);

PropertyCard.displayName = "PropertyCard";

export default PropertyCard;
