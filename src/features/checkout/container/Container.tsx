"use client";
import { CheckCircle, Clock, CreditCard, MapPin, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { CheckoutData } from "../types/checkout";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { checkoutCart } from "@/api/services/products/checkout";
import { paymentMethods } from "../data/checkoutPayment";
import CheckoutHeader from "../components/CheckoutHeader";
import SuccessCo from "../components/SuccessCo";

const CheckoutPage = () => {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Udin Petot",
    phone: "08123456789",
    verified: false,
  });
  console.log(setUserInfo)

  useEffect(() => {
    const storedData = localStorage.getItem("checkout_data");
    if (storedData) {
      const data: CheckoutData = JSON.parse(storedData);
      const thirtyMinutes = 30 * 60 * 1000;
      if (Date.now() - data.timestamp < thirtyMinutes) {
        setCheckoutData(data);
      } else {
        router.push("/cart");
      }
    } else {
      router.push("/cart");
    }
  }, [router]);

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  const calculateTotal = () => {
    if (!checkoutData) return 0;
    const subtotal = checkoutData.summary.selected_price;
    const selectedMethod = paymentMethods.find((m) => m.id === selectedPayment);
    const fee = selectedMethod?.fee || 0;
    return subtotal + fee;
  };

  const handleCheckout = async () => {
    if (!checkoutData || !selectedPayment) return;

    setLoading(true);
    try {
      const payload = {
        cart_items_id: checkoutData.items.map((item) => item.cart_items_id),
      };

      const result = await checkoutCart(payload);
      console.log("Checkout success:", result);

      localStorage.removeItem("checkout_data");
      
      setShowSuccessPopup(true);
      
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Gagal melakukan checkout. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleNavigateHome = () => {
    setShowSuccessPopup(false);
    router.push("/home");
  };

  if (!checkoutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat data checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <CheckoutHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold">Alamat Pengiriman</h2>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{userInfo.name}</p>
                    <p className="text-sm text-gray-600">{userInfo.phone}</p>
                  </div>
                  {userInfo.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Terverifikasi
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700">
                  Jl. Veteran, Ketawanggede, Lowokwaru, Kota Malang, Jawa Timur,
                  Indonesia
                </p>
                <button className="text-blue-600 text-sm font-medium mt-2 hover:underline">
                  Ubah Alamat
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                Seafood Store
              </h2>

              <div className="space-y-4">
                {checkoutData.items.map((item) => (
                  <div
                    key={item.cart_items_id}
                    className="flex gap-4 p-4 border border-gray-100 rounded-lg"
                  >
                    <img
                      src={item.image_url}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {item.product_name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {item.store_name}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Jumlah: {item.quantity}
                        </span>
                        <span className="font-bold text-blue-600">
                          Rp
                          {(item.price * item.quantity).toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Reguler</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    Estimasi tiba 2-3 hari
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Gratis Ongkir</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-full">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Metode Pembayaran
            </h2>

            <div className="lg:col-span-1">
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPayment === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handlePaymentSelect(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={selectedPayment === method.id}
                          onChange={() => handlePaymentSelect(method.id)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="w-8 h-6 relative">
                          <Image
                            src={method.icon}
                            alt={method.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="font-medium">{method.name}</span>
                      </div>
                      {method.fee && (
                        <span className="text-sm text-gray-600">
                          +Rp{method.fee.toLocaleString("id-ID")}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {!userInfo.verified && (
                  <div className="bg-white border border-netral-200 rounded-lg p-4 mb-4">
                    <p className="text-xs text-netral-250">
                      <span className="font-semibold text-netral-200 mr-1">
                        Verifikasi nomor HP
                      </span>
                      Biar bisa pakai Promo!
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({checkoutData.summary.selected_items} barang)
                  </span>
                  <span>
                    Rp
                    {checkoutData.summary.selected_price.toLocaleString(
                      "id-ID"
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Ongkos Kirim</span>
                  <span className="text-green-600">GRATIS</span>
                </div>

                {selectedPayment &&
                  paymentMethods.find((m) => m.id === selectedPayment)?.fee && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Biaya Layanan</span>
                      <span>
                        Rp
                        {paymentMethods
                          .find((m) => m.id === selectedPayment)
                          ?.fee?.toLocaleString("id-ID")}
                      </span>
                    </div>
                  )}

                <hr className="my-3" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Tagihan</span>
                  <span className="text-blue-600">
                    Rp{calculateTotal().toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!selectedPayment || loading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  selectedPayment && !loading
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Memproses...
                  </div>
                ) : (
                  "Bayar Sekarang"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Dengan melanjutkan, kamu menyetujui syarat dan ketentuan yang
                berlaku
              </p>
            </div>
          </div>
        </div>
      </div>

      <SuccessCo
        isOpen={showSuccessPopup}
        onClose={handleCloseSuccessPopup}
        onNavigateHome={handleNavigateHome}
        orderTotal={calculateTotal()}
      />
    </div>
  );
};

export default CheckoutPage;