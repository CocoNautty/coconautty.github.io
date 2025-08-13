import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to track mouse interactions and activity
 * @param {number} throttleMs - Throttle delay for mouse move events
 * @param {number} inactivityMs - Inactivity timeout in milliseconds
 * @returns {object} - Object containing mouse state and handlers
 */
export const useMouseInteraction = (throttleMs = 10, inactivityMs = 10) => {
  const [mouseState, setMouseState] = useState({
    isActive: false,
    position: { x: 0, y: 0 },
    displacement: { x: 0, y: 0 }
  });

  const lastPositionRef = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef(null);
  const lastMoveTimeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const now = Date.now();
      
      // Throttle mouse move events
      if (now - lastMoveTimeRef.current < throttleMs) {
        return;
      }
      
      lastMoveTimeRef.current = now;
      
      const currentPosition = { x: event.clientX, y: event.clientY };
      const displacement = {
        x: currentPosition.x - lastPositionRef.current.x,
        y: currentPosition.y - lastPositionRef.current.y
      };

      setMouseState({
        isActive: true,
        position: currentPosition,
        displacement
      });

      lastPositionRef.current = currentPosition;

      // Clear existing timeout and set new one
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setMouseState(prev => ({
          ...prev,
          isActive: false,
          displacement: { x: 0, y: 0 }
        }));
      }, inactivityMs);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timeoutRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [throttleMs, inactivityMs]);

  return mouseState;
};