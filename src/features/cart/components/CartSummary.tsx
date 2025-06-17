import React from 'react';
import { CartSummary as CartSummaryType } from '../types/cart';

interface CartSummaryProps {
  summary: CartSummaryType;
  onProceedToCheckout: () => void;
  loading?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  summary,
  onProceedToCheckout,
  loading = false,
}) => {
  const canProceed = summary.selected_items > 0 && !loading;

  return (
    <div
      className={`
        bg-white border-t border-gray-200 p-4
        fixed bottom-0 left-0 right-0 z-10
        sm:static sm:rounded-lg sm:border sm:p-6
      `}
    >
      {/* --- NI destop wak --- */}
      <div className="hidden sm:block">
        <h3 className="text-lg font-semibold mb-4">Ringkasan Belanja</h3>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total</span>
            <span className="font-medium">
              Rp{summary.total_price.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Item</span>
            <span className="font-medium">{summary.total_items} barang</span>
          </div>

          {summary.selected_items > 0 && (
            <>
              <hr className="my-3" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Item Dipilih</span>
                <span className="font-medium">{summary.selected_items} barang</span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Subtotal</span>
                <span className="text-blue-600">
                  Rp{summary.selected_price.toLocaleString('id-ID')}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="space-y-3">
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p>Verifikasi nomor HP kamu untuk melanjutkan proses pembayaran</p>
          </div>

          <button
            onClick={onProceedToCheckout}
            disabled={!canProceed}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              canProceed
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading
              ? 'Loading...'
              : `Lanjut ke Pembayaran (${summary.selected_items})`}
          </button>
        </div>
      </div>

      {/* --- Kalo ni Mobil wak ngeng ngeng --- */}
      <div className="flex sm:hidden items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">
            Subtotal ({summary.selected_items} barang)
          </span>
          <span className="text-base font-semibold text-blue-600">
            Rp{summary.selected_price.toLocaleString('id-ID')}
          </span>
        </div>

        <button
          onClick={onProceedToCheckout}
          disabled={!canProceed}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors text-sm ${
            canProceed
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Loading...' : 'Bayar'}
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
