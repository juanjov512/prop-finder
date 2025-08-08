import React, { useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faRulerCombined,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {
  CardContent,
  Details,
  ImageContainer,
  ImageCounter,
  CardHeader,
  Price,
} from "./styles";
import type { IPropertyCardContentProps } from "./types";

const PropertyCardContent: React.FC<IPropertyCardContentProps> = React.memo(
  ({
    title,
    bedrooms,
    bathrooms,
    area,
    images,
    price,
    type,
  }: IPropertyCardContentProps) => {
    const formatPrice = useCallback((price: number | string) => {
      const numericPrice =
        typeof price === "string" ? parseInt(price, 10) : price;

      if (numericPrice >= 1000000) {
        return `$${(numericPrice / 1000000).toFixed(1)}M`;
      } else if (numericPrice >= 1000) {
        return `$${(numericPrice / 1000).toFixed(0)}K`;
      }
      return `$${numericPrice.toLocaleString()}`;
    }, []);

    const mainImage = useMemo(() => images?.[0]?.image?.url, [images]);
    const imageCount = useMemo(() => images?.length || 0, [images]);

    return (
      <CardContent>
        <CardHeader>
          <Price>{formatPrice(price)}</Price>
          <div>{type}</div>
        </CardHeader>
        {mainImage && (
          <ImageContainer>
            <Image
              src={mainImage}
              alt={title || "Propiedad"}
              width={200}
              height={200}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "0.375rem",
                objectFit: "cover",
              }}
            />
            {imageCount > 1 && (
              <ImageCounter>
                <FontAwesomeIcon icon={faImage} />
                <span>{imageCount}</span>
              </ImageCounter>
            )}
          </ImageContainer>
        )}
        <Details>
          <FontAwesomeIcon icon={faBed} />
          &nbsp;
          <span>{bedrooms}</span>
          &nbsp;
          <FontAwesomeIcon icon={faBath} />
          &nbsp;
          <span>{bathrooms}</span>
          &nbsp;
          <FontAwesomeIcon icon={faRulerCombined} />
          &nbsp;
          <span>{area}m²</span>
        </Details>
      </CardContent>
    );
  }
);

PropertyCardContent.displayName = "PropertyCardContent";

export default PropertyCardContent;
