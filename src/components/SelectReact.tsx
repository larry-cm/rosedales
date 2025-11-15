import React, { useState, useRef, useEffect } from 'react';
import { Check } from 'react-feather';
interface Option {
    value: string;
    label: string;
}

interface SelectReactProps {
    name: string;
    options: Option[] | [];
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    setVal: (val: string) => void | undefined;
}

export const SelectReact: React.FC<SelectReactProps> = ({
    name,
    options,
    placeholder = 'Selecciona una opción',
    className = '',
    value = '',
    setVal,
    onChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedValue, setSelectedValue] = useState(value);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSelect = (option: Option) => {
        setVal(option.value);
        setIsOpen(false);
        if (onChange) {
            onChange(option.value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                setIsOpen(true);
                setFocusedIndex(0);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex(prev =>
                    prev < options.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex(prev => prev > 0 ? prev - 1 : prev);
                break;
            case 'Enter':
                e.preventDefault();
                if (focusedIndex >= 0) {
                    handleSelect(options[focusedIndex]);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                buttonRef.current?.focus();
                break;
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => { setVal(value) }, [value])
    const selectedOption = options.find(option => option.value === value);
    const displayText = selectedOption ? selectedOption.label : placeholder;

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                ref={buttonRef}
                type="button"
                className="bg-zinc-100 text-nowrap outline-none rounded-lg ring ring-green-700 px-4 py-2 w-full flex justify-between items-center gap-4 min-w-full text-start lg:min-w-xs "
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={displayText}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
            >
                <span className={value ? 'text-zinc-900' : 'text-zinc-500'}>
                    {displayText}
                </span>
                <svg
                    className={`w-5 h-5 text-zinc-500 duration-300 transition-transform ${(isOpen && options.length > 0) ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {(isOpen && options.length > 0) && (
                <div
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-300 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto min-w-full snap-y snap-mandatory sm:snap-none overflow-hidden"
                    role="listbox"
                    aria-label={`Opciones para ${placeholder}`}
                >
                    {options.map((option, index) => (
                        <button
                            key={option.value}
                            type="button"
                            className={`w-full px-4 py-3 text-left flex justify-between items-center   focus:outline-none transition duration-300 ${value === option.value ? 'bg-green-500  text-white font-semibold' : 'text-zinc-700 hover:text-zinc-900 hover:scale-102 hover:bg-zinc-100'
                                } ${focusedIndex === index ? 'bg-green-100' : ''} snap-center sm:snap-none`}
                            role="option"
                            aria-selected={value === option.value}
                            onClick={() => handleSelect(option)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleSelect(option);
                                }
                            }}
                        >
                            {option.label} {value === option.value && <Check className='size-6' />}
                        </button>
                    ))}
                </div>
            )}

            <input type="hidden" name={name} value={value} />
        </div>
    );
};

export default SelectReact;