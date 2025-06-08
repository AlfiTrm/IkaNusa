import { useState } from "react";

export const useDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Pilih Alamat Pengirimanmu");

    const toggle = () => setIsOpen(!isOpen);
    const select = (value: string) => {
        setSelected(value);
        setIsOpen(false);
    };

    return {
        isOpen,
        selected,
        toggle,
        select,
    };
};
