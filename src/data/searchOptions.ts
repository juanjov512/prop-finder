export interface SearchOption {
  value: string;
  label: string;
  type?: string;
}

export const searchOptions: SearchOption[] = [
  // Ubicaciones populares
  { value: "madrid-centro", label: "Madrid Centro", type: "Ubicación" },
  { value: "valencia-centro", label: "Valencia Centro", type: "Ubicación" },
  { value: "sevilla-triana", label: "Sevilla Triana", type: "Ubicación" },
  { value: "malaga-centro", label: "Málaga Centro", type: "Ubicación" },
  { value: "bilbao-indautxu", label: "Bilbao Indautxu", type: "Ubicación" },
  { value: "granada-albaicin", label: "Granada Albaicín", type: "Ubicación" },
  { value: "salamanca-centro", label: "Salamanca Centro", type: "Ubicación" },
  { value: "barcelona-eixample", label: "Barcelona Eixample", type: "Ubicación" },
  
  // Tipos de propiedad
  { value: "apartamento", label: "Apartamento", type: "Tipo" },
  { value: "casa", label: "Casa", type: "Tipo" },
  { value: "duplex", label: "Dúplex", type: "Tipo" },
  { value: "atico", label: "Ático", type: "Tipo" },
  { value: "estudio", label: "Estudio", type: "Tipo" },
  { value: "villa", label: "Villa", type: "Tipo" },
  { value: "piso", label: "Piso", type: "Tipo" },
  
  // Características
  { value: "terraza", label: "Con Terraza", type: "Característica" },
  { value: "balcon", label: "Con Balcón", type: "Característica" },
  { value: "ascensor", label: "Con Ascensor", type: "Característica" },
  { value: "parking", label: "Con Parking", type: "Característica" },
  { value: "jardin", label: "Con Jardín", type: "Característica" },
  { value: "piscina", label: "Con Piscina", type: "Característica" },
  { value: "aire-acondicionado", label: "Aire Acondicionado", type: "Característica" },
  { value: "calefaccion", label: "Calefacción", type: "Característica" },
  
  // Rangos de precio
  { value: "precio-100k-200k", label: "100k - 200k €", type: "Precio" },
  { value: "precio-200k-300k", label: "200k - 300k €", type: "Precio" },
  { value: "precio-300k-500k", label: "300k - 500k €", type: "Precio" },
  { value: "precio-500k-1m", label: "500k - 1M €", type: "Precio" },
  { value: "precio-1m+", label: "Más de 1M €", type: "Precio" },
  
  // Rangos de habitaciones
  { value: "1-habitacion", label: "1 Habitación", type: "Habitaciones" },
  { value: "2-habitaciones", label: "2 Habitaciones", type: "Habitaciones" },
  { value: "3-habitaciones", label: "3 Habitaciones", type: "Habitaciones" },
  { value: "4-habitaciones", label: "4 Habitaciones", type: "Habitaciones" },
  { value: "5-habitaciones", label: "5+ Habitaciones", type: "Habitaciones" },
]; 