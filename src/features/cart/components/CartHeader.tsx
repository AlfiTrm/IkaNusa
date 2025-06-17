import React from 'react';

interface CartHeaderProps {
  totalItems: number;
  selectedCount: number;
  allSelected: boolean;
  onSelectAll: (selected: boolean) => void;
}

const CartHeader: React.FC<CartHeaderProps> = ({
  totalItems,
  selectedCount,
  allSelected,
  onSelectAll,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <span className="font-medium text-gray-900">
            Pilih Semua ({totalItems})
          </span>
        </div>
        
        {selectedCount > 0 && (
          <span className="text-sm text-blue-600 font-medium">
            {selectedCount} item dipilih
          </span>
        )}
      </div>
    </div>
  );
};

export default CartHeader;