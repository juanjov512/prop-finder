# Prop Finder

Aplicación web para búsqueda y visualización de propiedades inmobiliarias con integración de mapas.

## 🚀 Características

- Búsqueda de propiedades en tiempo real
- Visualización en mapa interactivo con clusters
- Filtros avanzados de búsqueda
- Interfaz de usuario moderna y responsiva
- Tipado estático con TypeScript

## 🛠️ Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/juanjov512/prop-finder.git
   cd prop-finder
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_de_google_maps
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=tu_endpoint_de_graphql
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Arquitectura

### Estructura del Proyecto

```
src/
├── app/                  # Rutas de la aplicación (App Router)
├── components/           # Componentes reutilizables
├── styles/              # Estilos globales y temas
├── types/               # Definiciones de tipos TypeScript
└── utils/               # Utilidades y helpers
```

### Decisiones Arquitectónicas

1. **Next.js App Router**: Utilizamos el nuevo App Router de Next.js para el enrutamiento del lado del servidor (SSR) y generación de sitios estáticos.

2. **GraphQL con Apollo Client**: Implementación de GraphQL para la gestión de datos, permitiendo consultas eficientes y tipadas.

3. **Google Maps Integration**: Uso de `@react-google-maps/api` para la visualización de mapas interactivos con clustering para mejor rendimiento.

4. **Styled Components**: Para estilos con CSS-in-JS, permitiendo estilos dinámicos basados en props y temas.

5. **Radix UI**: Componentes accesibles y sin estilos para construir la interfaz de usuario.

## ⚡ Optimizaciones

- **Código dividido**: Carga perezosa de componentes pesados.
- **Revalidación incremental**: Para mantener los datos actualizados sin recargar la página completa.
- **Optimización de imágenes**: Uso del componente `next/image` para carga optimizada de imágenes.
- **Server Components**: Uso de Server Components para reducir el tamaño del bundle del cliente.

## 🛡️ Casos Edge Manejados

1. **Accesibilidad**: Navegación por teclado y etiquetas ARIA implementadas.
2. **Errores de API**: Manejo de errores para fallos en las peticiones a la API.
3. **Datos vacíos**: Estados vacíos bien diseñados cuando no hay resultados de búsqueda.
4. **Responsive Design**: La aplicación se adapta a diferentes tamaños de pantalla.

## 🚀 Mejoras Futuras

- [ ] Añadir favoritos y comparación de propiedades
- [ ] Añadir más filtros de búsqueda avanzada
- [ ] Buscar propiedades basado en la latitud y longitud de una ubicación
- [ ] Filtrar propiedades desde el mapa
