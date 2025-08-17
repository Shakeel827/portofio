import React from 'react';

interface ConnectionBarProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  color?: 'gradient' | 'cyan' | 'purple' | 'pink' | 'green' | 'orange';
  thickness?: 'thin' | 'normal' | 'thick';
  animated?: boolean;
}

const ConnectionBar: React.FC<ConnectionBarProps> = ({
  className = '',
  orientation = 'horizontal',
  color = 'gradient',
  thickness = 'normal',
  animated = true,
}) => {
  // Define color gradients
  const colorMap = {
    gradient: 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500',
    cyan: 'bg-cyan-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
  };

  // Define thickness
  const thicknessMap = {
    thin: 'w-0.5',
    normal: 'w-1',
    thick: 'w-1.5',
  };

  // Determine orientation classes
  const orientationClasses = orientation === 'horizontal' 
    ? 'w-full h-1' 
    : 'h-full w-0.5';

  // Animation classes
  const animationClass = animated ? 'animate-pulse' : '';

  return (
    <div 
      className={`relative ${orientationClasses} ${thicknessMap[thickness]} ${colorMap[color]} ${animationClass} ${className}`}
      aria-hidden="true"
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-current opacity-30 blur-sm`}></div>
    </div>
  );
};

export default ConnectionBar;
