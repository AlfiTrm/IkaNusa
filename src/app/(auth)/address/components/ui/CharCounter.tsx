import React from 'react';

interface CharCounterProps {
  current: number;
  max: number;
}

const CharCounter: React.FC<CharCounterProps> = ({ current, max }) => {
  const isNearLimit = current > max * 0.8;
  const isOverLimit = current > max;

  return (
    <div className={`text-sm text-right mt-1 ${isOverLimit ? "text-red-500" : isNearLimit ? "text-yellow-600" : "text-gray-400"}`}>
      {current}/{max}
    </div>
  );
};

export default CharCounter;
