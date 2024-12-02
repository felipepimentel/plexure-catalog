import { useState, useCallback } from 'react';

export function useKeyboardNavigation(itemCount: number) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < itemCount - 1 ? prev + 1 : 0
        );
        break;
      
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : itemCount - 1
        );
        break;
      
      case 'Escape':
        event.preventDefault();
        setSelectedIndex(-1);
        break;
    }
  }, [itemCount]);

  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown
  };
}