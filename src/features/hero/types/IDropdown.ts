export interface IDropdown {
    isOpen: boolean;
    selected: string;
    toggle: () => void;
    select: (value: string) => void;
    options: string[];
}