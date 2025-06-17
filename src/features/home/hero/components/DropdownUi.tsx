import { ChevronDown, MapPin } from "lucide-react";
import { IDropdown } from "../types/IDropdown";

const DropdownUi = ({
  isOpen,
  selected,
  toggle,
  select,
  options,
}: IDropdown) => {
  return (
    <div className="relative inline-block text-left">
      <div
        className="flex items-center gap-1 text-sm text-netral-200 cursor-pointer hover:text-black"
        onClick={toggle}
      >
        <MapPin size={18} />
        <p className="max-w-[160px] truncate">{selected}</p>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg border border-gray-200">
          <ul className="py-1">
            {options.map((address) => (
              <li
                key={address}
                onClick={() => select(address)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {address}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownUi;
