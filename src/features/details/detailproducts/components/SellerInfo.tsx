import { Store } from "lucide-react";

const SellerInfo = ({ storeName }: { storeName: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Store className="w-6 h-6 text-blu-350" />
        <span className="text-xl font-semibold text-netral-200">
          {storeName}
        </span>
      </div>
      <button className="border border-blu-350 text-blu-350 font-semibold px-3 py-1 rounded-lg hover:bg-blu-100 cursor-pointer transition">
        Follow
      </button>
    </div>
  );
};
export default SellerInfo;
