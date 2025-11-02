"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import { useEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback, useMemo } from "react";
import { DISABLE_HYPERTEXT_ANIMATIONS } from "@/lib/performance-config";

type CharacterSet = string[] | readonly string[];

interface HyperTextProps extends MotionProps {
  /** The text content to be animated */
  children: string;
  /** Optional className for styling */
  className?: string;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Component to render as - defaults to div */
  as?: React.ElementType;
  /** Whether to start animation when element comes into view */
  startOnView?: boolean;
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean;
  /** Custom character set for scramble effect. Defaults to uppercase alphabet */
  characterSet?: CharacterSet;
  /** Disable all animations and render static text for better performance */
  disabled?: boolean;
}

const DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
) as readonly string[];

// Pre-calculate random characters to avoid repeated calculations
const getRandomChar = (() => {
  const cache = new Map<number, string[]>();
  
  return (characterSet: CharacterSet, count: number = 100): string => {
    const setLength = characterSet.length;
    if (!cache.has(setLength)) {
      cache.set(setLength, Array.from({ length: count }, () => 
        characterSet[Math.floor(Math.random() * setLength)]
      ));
    }
    const randomChars = cache.get(setLength)!;
    return randomChars[Math.floor(Math.random() * randomChars.length)];
  };
})();

export const HyperText = forwardRef<{ triggerAnimation: () => void }, HyperTextProps>(function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  disabled = false,
  ...props
}: HyperTextProps, ref) {
  // 🚀 PERFORMANCE: Estados y refs siempre se declaran para mantener orden de Hooks
  const initialText = useMemo(() => children.split(""), [children]);
  const [displayText, setDisplayText] = useState<string>(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef<HTMLElement>(null);
  const animationFrameId = useRef<number>(0);

  const handleAnimationTrigger = useCallback(() => {
    if (!isAnimating && !disabled && !DISABLE_HYPERTEXT_ANIMATIONS) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  }, [isAnimating, disabled]);

  // ✅ useImperativeHandle siempre se ejecuta para mantener el orden de Hooks
  useImperativeHandle(ref, () => ({
    triggerAnimation: (disabled || DISABLE_HYPERTEXT_ANIMATIONS) ? () => {} : handleAnimationTrigger
  }), [handleAnimationTrigger, disabled]);

  // Handle animation start based on view or delay - ALWAYS execute hooks
  useEffect(() => {
    // Skip effect if disabled to avoid unnecessary work
    if (disabled || DISABLE_HYPERTEXT_ANIMATIONS) return;

    if (!startOnView && delay > 0) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    } else if (!startOnView && delay === 0) {
      // No delay, don't start animation automatically
      return;
    }

    // Use passive observer for better performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timeoutId = setTimeout(() => {
            setIsAnimating(true);
          }, delay);
          observer.disconnect();
          return () => clearTimeout(timeoutId);
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: "-30% 0px -30% 0px",
        // Use passive flag for better scroll performance
      },
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [delay, startOnView, disabled]);

  // Optimized scramble animation - ALWAYS execute hooks
  useEffect(() => {
    // Skip effect if disabled to avoid unnecessary work
    if (disabled || DISABLE_HYPERTEXT_ANIMATIONS || !isAnimating) return;

    const maxIterations = initialText.length;
    const startTime = performance.now();
    
    // Pre-calculate frames to reduce computation during animation
    const frameRate = 60; // Target 60fps
    const frameDuration = 1000 / frameRate;
    let lastFrameTime = startTime;

    const animate = (currentTime: number) => {
      // Throttle to target frame rate
      if (currentTime - lastFrameTime < frameDuration) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      iterationCount.current = progress * maxIterations;

      // Build string directly instead of array operations
      let newText = '';
      for (let i = 0; i < initialText.length; i++) {
        const letter = initialText[i];
        if (letter === ' ') {
          newText += letter;
        } else if (i <= iterationCount.current) {
          newText += children[i];
        } else {
          newText += getRandomChar(characterSet);
        }
      }
      
      setDisplayText(newText);

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        animationFrameId.current = 0;
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = 0;
      }
    };
  }, [children, duration, isAnimating, characterSet, initialText, disabled]);

  // Memoize the motion component creation - ALWAYS execute hooks
  const motionProps = useMemo(() => ({
    ref: elementRef,
    className: cn("overflow-hidden", className),
    onMouseEnter: animateOnHover ? handleAnimationTrigger : undefined,
    ...props
  }), [className, animateOnHover, handleAnimationTrigger, props]);

  // 🚀 PERFORMANCE: Si está desactivado globalmente o por prop, renderizar componente estático simple
  if (disabled || DISABLE_HYPERTEXT_ANIMATIONS) {
    const StaticComponent = Component;
    
    return (
      <StaticComponent
        className={cn("overflow-hidden", className)}
        style={{
          fontFamily: 'inherit',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          ...props.style
        }}
        {...props}
      >
        {children}
      </StaticComponent>
    );
  }

  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      {...motionProps}
      style={{
        fontFamily: 'inherit',
        whiteSpace: 'pre-wrap', // Permite wrap pero preserva espacios
        wordBreak: 'break-word', // Permite romper palabras largas si es necesario
        ...props.style
      }}
    >
      {displayText}
    </MotionComponent>
  );
});
