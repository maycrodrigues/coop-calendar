import { useState, useCallback } from 'react';

interface TooltipState {
  isVisible: boolean;
  x: number;
  y: number;
}

export const useTooltip = () => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    isVisible: false,
    x: 0,
    y: 0,
  });

  const showTooltip = useCallback((event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      isVisible: true,
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
    });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip(prev => ({ ...prev, isVisible: false }));
  }, []);

  return {
    tooltip,
    showTooltip,
    hideTooltip,
  };
};