export interface SearchOption {
  value: string;
  label: string;
}

// Preferiblemente, obtener las ubicaciones de la API
// se hizo de esta manera para casos de prueba
export const searchOptions: SearchOption[] = [
  // Ubicaciones populares
  { value: "Medellín", label: "Medellín" },
  { value: "Envigado", label: "Envigado" },
  { value: "La Estrella", label: "La Estrella" },
  { value: "Santafé de Antioquia", label: "Santa Fé de Antioquia" },
  { value: "La Ceja", label: "La Ceja" },
  { value: "Rionegro", label: "Rionegro" },
  { value: "Puerto Berrío", label: "Puerto Berrío" },
  { value: "Bogotá D.C.", label: "Bogotá" },
  { value: "Cartagena", label: "Cartagena" },
  { value: "Barranquilla", label: "Barranquilla" },
  { value: "Pereira", label: "Pereira" },
  { value: "Cúcuta", label: "Cúcuta" },
  { value: "Santa Marta", label: "Santa Marta" },
]; 