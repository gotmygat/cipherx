import React, { useState, useEffect, useRef } from 'react';

interface FPSCounterProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  style?: React.CSSProperties;
}

const FPSCounter: React.FC<FPSCounterProps> = ({ 
  position = 'top-right',
  style = {}
}) => {
  const [fps, setFps] = useState(0);
  const [avgFps, setAvgFps] = useState(0);
  const [minFps, setMinFps] = useState(60);
  const [maxFps, setMaxFps] = useState(0);
  
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fpsHistory = useRef<number[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const updateFPS = (currentTime: number) => {
      frameCount.current++;
      
      const deltaTime = currentTime - lastTime.current;
      
      if (deltaTime >= 1000) { // Update every second
        const currentFPS = Math.round((frameCount.current * 1000) / deltaTime);
        
        setFps(currentFPS);
        
        // Keep history for average calculation (last 10 seconds)
        fpsHistory.current.push(currentFPS);
        if (fpsHistory.current.length > 10) {
          fpsHistory.current.shift();
        }
        
        // Calculate average
        const avg = Math.round(
          fpsHistory.current.reduce((sum, val) => sum + val, 0) / fpsHistory.current.length
        );
        setAvgFps(avg);
        
        // Update min/max
        setMinFps(prev => Math.min(prev, currentFPS));
        setMaxFps(prev => Math.max(prev, currentFPS));
        
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      animationFrameId.current = requestAnimationFrame(updateFPS);
    };

    animationFrameId.current = requestAnimationFrame(updateFPS);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const getPositionStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'fixed',
      zIndex: 10000,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: '#00ff00',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontFamily: 'Monaco, Consolas, "Courier New", monospace',
      fontWeight: 'bold',
      border: '1px solid #333',
      backdropFilter: 'blur(4px)',
      minWidth: '120px',
      userSelect: 'none',
      pointerEvents: 'none'
    };

    switch (position) {
      case 'top-left':
        return { ...baseStyle, top: '20px', left: '20px' };
      case 'top-right':
        return { ...baseStyle, top: '20px', right: '20px' };
      case 'bottom-left':
        return { ...baseStyle, bottom: '20px', left: '20px' };
      case 'bottom-right':
        return { ...baseStyle, bottom: '20px', right: '20px' };
      default:
        return { ...baseStyle, top: '20px', right: '20px' };
    }
  };

  const getFPSColor = (fpsValue: number): string => {
    if (fpsValue >= 55) return '#00ff00'; // Verde para 55+ FPS
    if (fpsValue >= 30) return '#ffff00'; // Amarillo para 30-54 FPS
    return '#ff0000'; // Rojo para menos de 30 FPS
  };

  return (
    <div style={{ ...getPositionStyle(), ...style }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: getFPSColor(fps)
        }}>
          <span>FPS:</span>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{fps}</span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          color: '#aaaaaa',
          fontSize: '10px'
        }}>
          <span>AVG:</span>
          <span>{avgFps}</span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          color: '#aaaaaa',
          fontSize: '10px'
        }}>
          <span>MIN/MAX:</span>
          <span>{minFps}/{maxFps}</span>
        </div>
      </div>
    </div>
  );
};

export default FPSCounter;
