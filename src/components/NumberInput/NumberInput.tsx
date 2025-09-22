import React, { useState } from 'react';
import './NumberInput.scss';
import { FaSearch } from 'react-icons/fa';

type NumberInputProps = {
    numValue?: number;
    onUpdate: (value: number | null) => void;
};

export default function NumberInput({ numValue, onUpdate }: NumberInputProps) {
    const [value, setValue] = useState<string>(
        numValue !== undefined ? String(numValue) : ''
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
    };

    const handleUpdate = () => {
        if (value === '') {
            onUpdate(null);
        } else {
            onUpdate(parseInt(value, 10));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleUpdate();
        }
    };

    return (
        <div className="number-input-container">
            <div className="input-wrapper">
                <input
                    type="number"
                    value={value}
                    placeholder="Search by year"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    min="1998" max="2025"
                    step="1"
                />
            </div>
            <button type="button" className="search-btn" onClick={handleUpdate}>
                <FaSearch />
            </button>
        </div>
    );
};
