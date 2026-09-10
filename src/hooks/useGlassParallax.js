import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook providing a subtle 3D tilt and mouse-tracking coordinates
 * for glassmorphic cards with internal glow and parallax depth.
 *
 * @param {Object} options
 * @param {number} options.maxTilt - Maximum tilt angle in degrees (default: 2.2)
 * @returns {Object} Tracking states and mouse event handlers
 */
export function useGlassParallax({ maxTilt = 2.2 } = {}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 200, y: 150 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [normalized, setNormalized] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Clamped coordinates
    const clampedX = Math.max(0, Math.min(rect.width, x));
    const clampedY = Math.max(0, Math.min(rect.height, y));

    // Normalized -1 to 1
    const normX = (clampedX / rect.width) * 2 - 1;
    const normY = (clampedY / rect.height) * 2 - 1;

    // Subtle 3D tilt angle
    const tiltX = -normY * maxTilt;
    const tiltY = normX * maxTilt;

    setCoords({ x: clampedX, y: clampedY });
    setTilt({ x: +(tiltX.toFixed(2)), y: +(tiltY.toFixed(2)) });
    setNormalized({ x: +(normX.toFixed(2)), y: +(normY.toFixed(2)) });
  }, [maxTilt]);

  const handleMouseEnter = useCallback((e) => {
    setIsHovered(true);
    handleMouseMove(e);
  }, [handleMouseMove]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setNormalized({ x: 0, y: 0 });
  }, []);

  return {
    cardRef,
    isHovered,
    coords,
    tilt,
    normalized,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
