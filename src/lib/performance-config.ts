// 🚀 PERFORMANCE CONFIG
// Configuración global de rendimiento para la aplicación

/**
 * Desactivar todas las animaciones HyperText para mejorar rendimiento
 * Set to true para desactivar completamente todos los efectos HyperText
 * Set to false para mantener las animaciones normales
 */
export const DISABLE_HYPERTEXT_ANIMATIONS = false;

/**
 * Configuración específica por sección
 * Permite control granular de donde desactivar HyperText
 */
export const SECTION_PERFORMANCE_CONFIG = {
  // Primera sección (container principal) - MANTENER activo
  firstSection: {
    disableHyperText: false
  },
  // Segunda sección - DESACTIVAR para mejor performance
  secondSection: {
    disableHyperText: true
  },
  // Tercera sección - DESACTIVAR para mejor performance  
  thirdSection: {
    disableHyperText: true
  },
  // Navbar - MANTENER activo
  navbar: {
    disableHyperText: false
  }
} as const;

/**
 * Configuración de throttling para eventos de scroll
 * Valor en milisegundos para throttling de eventos de scroll
 */
export const SCROLL_THROTTLE_MS = 16; // ~60fps

/**
 * Configuración de FPS target para animaciones
 * Valor objetivo de FPS para animaciones costosas
 */
export const TARGET_FPS = 60;

/**
 * Configuración de Intersection Observer para mejor rendimiento
 */
export const INTERSECTION_OBSERVER_CONFIG = {
  // Threshold más permisivo para móvil
  threshold: 0.1,
  // Margin para trigger temprano en móvil
  rootMargin: "-30% 0px -30% 0px",
} as const;
