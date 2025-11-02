// Test simple para verificar que DISABLE_HYPERTEXT_ANIMATIONS funciona
import { DISABLE_HYPERTEXT_ANIMATIONS } from './lib/performance-config.ts';

console.log('🚀 PERFORMANCE CONFIG TEST');
console.log('DISABLE_HYPERTEXT_ANIMATIONS:', DISABLE_HYPERTEXT_ANIMATIONS);

if (DISABLE_HYPERTEXT_ANIMATIONS === true) {
  console.log('✅ SUCCESS: Las animaciones HyperText están DESACTIVADAS globalmente');
  console.log('📊 PERFORMANCE: Todas las instancias de HyperText renderizarán texto estático');
} else {
  console.log('❌ ERROR: Las animaciones HyperText siguen ACTIVADAS');
}
