// 🚀 PERFORMANCE TEST UTILITY
// Script para verificar las optimizaciones implementadas

export class PerformanceMonitor {
  private observers: IntersectionObserver[] = [];
  private animationsActive: Map<string, boolean> = new Map();
  
  // Monitorear intersecciones
  static monitorIntersections() {
    console.log('🔍 Monitoring intersection observers...');
    
    // Test Marquee Text
    const marqueeContainer = document.querySelector('.marquee-container');
    if (marqueeContainer) {
      console.log('✅ Marquee container found');
    } else {
      console.log('❌ Marquee container NOT found');
    }
    
    // Test Cards Marquee  
    const cardsContainer = document.querySelector('.cards-marquee-container');
    if (cardsContainer) {
      console.log('✅ Cards marquee container found');
    } else {
      console.log('❌ Cards marquee container NOT found');
    }
    
    // Test WalletCounter
    const walletCounter = document.querySelector('span[style*="font-family"]');
    if (walletCounter) {
      console.log('✅ WalletCounter found');
    } else {
      console.log('❌ WalletCounter NOT found');
    }
  }
  
  // Monitorear animaciones GSAP
  static monitorGSAPAnimations() {
    if (typeof window !== 'undefined' && 'gsap' in window) {
      const windowWithGsap = window as { gsap: { globalTimeline?: { getChildren(): unknown[] } } };
      const timelines = windowWithGsap.gsap.globalTimeline?.getChildren() || [];
      console.log(`📊 Active GSAP timelines: ${timelines.length}`);
      
      timelines.forEach((tl: unknown, index: number) => {
        const timeline = tl as { paused: () => boolean };
        console.log(`Timeline ${index}: ${timeline.paused() ? '⏸️ PAUSED' : '▶️ PLAYING'}`);
      });
    }
  }
  
  // Monitor FPS
  static startFPSMonitor() {
    let frames = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        console.log(`📊 FPS: ${fps}`);
        
        // Alerta si FPS es bajo
        if (fps < 30) {
          console.warn('⚠️ Low FPS detected!');
        } else if (fps >= 55) {
          console.log('🚀 Excellent FPS!');
        }
        
        frames = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }
  
  // Test scroll performance
  static testScrollPerformance() {
    let scrollEvents = 0;
    let lastScrollTime = performance.now();
    
    const scrollHandler = () => {
      scrollEvents++;
      const currentTime = performance.now();
      
      if (currentTime - lastScrollTime >= 1000) {
        console.log(`📊 Scroll events/sec: ${scrollEvents}`);
        scrollEvents = 0;
        lastScrollTime = currentTime;
      }
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Cleanup after 10 seconds
    setTimeout(() => {
      window.removeEventListener('scroll', scrollHandler);
      console.log('🔄 Scroll performance test completed');
    }, 10000);
  }
  
  // Comprehensive performance test
  static runFullPerformanceTest() {
    console.log('🚀 Starting comprehensive performance test...');
    console.log('===============================================');
    
    // Test 1: Check intersection observers
    setTimeout(() => {
      console.log('🔍 Test 1: Intersection Observers');
      this.monitorIntersections();
    }, 1000);
    
    // Test 2: GSAP animations
    setTimeout(() => {
      console.log('🎬 Test 2: GSAP Animations');
      this.monitorGSAPAnimations();
    }, 2000);
    
    // Test 3: FPS monitoring
    setTimeout(() => {
      console.log('📊 Test 3: FPS Monitoring (starting...)');
      this.startFPSMonitor();
    }, 3000);
    
    // Test 4: Scroll performance
    setTimeout(() => {
      console.log('📜 Test 4: Scroll Performance Test (10s duration)');
      this.testScrollPerformance();
    }, 4000);
    
    console.log('===============================================');
    console.log('ℹ️ Performance test initiated. Check console for results.');
  }
}

// Auto-run in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Wait for page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      PerformanceMonitor.runFullPerformanceTest();
    }, 2000);
  });
}

// Export for manual testing
export default PerformanceMonitor;
