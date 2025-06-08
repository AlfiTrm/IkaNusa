import React from "react";
import DropdownUi from "./DropdownUi";
import { useDropdown } from "../hooks/useDropdown";
import { addressList } from "../data/lokasi";

const Header = () => {
  const dropdown = useDropdown();
  return (
    <header className="mycontainer flex flex-col md:flex-row justify-between md:items-center w-full gap-4 md:gap-6 py-3">
      <ul className="grid grid-cols-3 sm:flex sm:gap-4 gap-2 text-sm text-netral-200 md:justify-center md:w-full w-100">
        <li className="shrink-0">Ikan laut</li>
        <li className="shrink-0">Scallop</li>
        <li className="shrink-0">Kepiting</li>
        <li className="shrink-0">Udang</li>
        <li className="shrink-0">Salmon</li>
        <li className="shrink-0">Kerang</li>
      </ul>

      <div className="z-10">
        <DropdownUi
          isOpen={dropdown.isOpen}
          selected={dropdown.selected}
          toggle={dropdown.toggle}
          select={dropdown.select}
          options={addressList}
        />
      </div>
    </header>
  );
};

export default Header;
