# BIOSANA - Landing Page Móvil-First

Landing page moderna y responsive para una purificadora de agua llamada BIOSANA, construida con Next.js 14, Tailwind CSS v4 y Framer Motion.

## 🚀 Características

- **Diseño Móvil-First**: Optimizado para dispositivos móviles con experiencia de usuario fluida
- **Carrusel de Slides Interactivo**: Navegación horizontal con transiciones suaves tipo Instagram
- **Paleta de Colores**: Azules claros y profundos (#0ea5e9 como color principal)
- **Formulario Inteligente**: Captura de leads con calificación automática
- **Integración con WhatsApp**: Mensaje prellenado con datos del formulario
- **Animaciones Fluidas**: Transiciones entre slides con Framer Motion
- **Diseño Minimalista**: Interfaz limpia y profesional

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS v4** (Configuración personalizada con paleta de azules)
- **Framer Motion** (Animaciones y transiciones)
- **Lucide React** (Íconos modernos)
- **React Hooks** (Estado y efectos)

## 📱 Slides Implementados

1. **Slide Hero**: Presentación del garrafón premium BIOSANA
2. **Slide Pureza**: Beneficio de pureza garantizada (99.9% de impurezas eliminadas)
3. **Slide Rapidez**: Entrega en menos de 2 horas en Tijuana
4. **Slide Precio**: Precios competitivos y transparentes
5. **Slide Formulario**: Calificación de leads con:
   - Tipo de cliente (Hogar, Oficina, Negocio)
   - Consumo semanal de garrafones
   - Zona en Tijuana (Centro, Playas, Otay, Mesa, Otras)

## 🤖 Funcionalidades Avanzadas

### Navegación del Carrusel
- Deslizamiento táctil (drag) en dispositivos móviles
- Botones de navegación anterior/siguiente
- Indicadores de progreso visuales
- Transiciones con efecto "spring" de Framer Motion

### Formulario Inteligente
- Validación en tiempo real
- Botones de selección visuales
- Resumen automático de datos capturados
- Integración directa con WhatsApp

### Integración con WhatsApp
- Mensaje preformateado con datos del lead
- Enlace directo que abre la conversación
- Información estructurada para el equipo de ventas

## 🎨 Paleta de Colores

```css
--blue-50: #f0f9ff;
--blue-100: #e0f2fe;
--blue-200: #bae6fd;
--blue-300: #7dd3fc;
--blue-400: #38bdf8;
--blue-500: #0ea5e9;  /* Color principal */
--blue-600: #0284c7;
--blue-700: #0369a1;
--blue-800: #075985;
--blue-900: #0c4a6e;
--blue-950: #082f49;
```

## 🚀 Cómo Ejecutar el Proyecto

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repo-url>
cd BIOSANA

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles
- `npm run dev` - Inicia el servidor de desarrollo en `localhost:3000`
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción

## 📁 Estructura del Proyecto

```
BIOSANA/
├── app/
│   ├── layout.tsx      # Layout principal con metadatos
│   ├── page.tsx        # Página principal con el carrusel
│   └── globals.css     # Estilos globales y paleta de colores
├── public/             # Assets estáticos
├── package.json        # Dependencias y scripts
└── README.md           # Documentación
```

## 🔧 Personalización

### Cambiar Número de WhatsApp
Editar la función `getWhatsAppLink()` en `app/page.tsx`:
```typescript
const getWhatsAppLink = () => {
  const message = encodeURIComponent(getWhatsAppMessage());
  return `https://wa.me/5216641234567?text=${message}`; // Cambiar número
};
```

### Agregar Nuevos Slides
Modificar el array `slides` en `app/page.tsx`:
```typescript
const slides: Slide[] = [
  // ... slides existentes
  {
    id: 6,
    type: "benefit",
    title: "Nuevo Beneficio",
    description: "Descripción del nuevo beneficio",
    icon: <IconComponent className="w-12 h-12 text-primary-600" />
  }
];
```

## 📱 Optimización Móvil

- Viewport configurado para dispositivos móviles
- Touch events para deslizamiento
- Tamaños de texto responsivos
- Botones con áreas de toque amplias
- Sin zoom para mejor experiencia

## 🎯 Objetivos Cumplidos

✅ Landing page móvil-first para BIOSANA  
✅ Estética minimalista con paleta de azules  
✅ Carrusel horizontal con 5 slides  
✅ Slide de garrafón premium  
✅ 3 slides de beneficios (Pureza, Rapidez, Precio)  
✅ Formulario de calificación de leads  
✅ Botón de WhatsApp con mensaje prellenado  
✅ Transiciones suaves con Framer Motion  
✅ Diseño responsive y optimizado para móviles  

## 📄 Licencia

Este proyecto fue desarrollado como demostración técnica. Todos los derechos de la marca BIOSANA son propiedad de sus respectivos dueños.

---

**Desarrollado con ❤️ usando Next.js, Tailwind CSS y Framer Motion**