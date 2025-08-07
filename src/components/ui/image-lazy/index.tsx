import React, { useState, useRef, useEffect } from "react";
import {
  ImageContainer,
  StyledImage,
  Placeholder,
  ErrorFallback,
} from "./styles";
import type { ILazyImageProps } from "./types";

const LazyImage: React.FC<ILazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  placeholder,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Si no hay src, mostrar placeholder
  if (!src) {
    return (
      <ImageContainer
        ref={containerRef}
        width={width}
        height={height}
        className={className}
      >
        <ErrorFallback>{placeholder || "Sin imagen"}</ErrorFallback>
      </ImageContainer>
    );
  }

  return (
    <ImageContainer
      ref={containerRef}
      width={width}
      height={height}
      className={className}
    >
      {!isLoaded && !hasError && <Placeholder />}

      {hasError && (
        <ErrorFallback>{placeholder || "Imagen no disponible"}</ErrorFallback>
      )}

      {isInView && !hasError && (
        <StyledImage
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </ImageContainer>
  );
};

export default LazyImage;
