import { render, screen, fireEvent } from '@testing-library/react';
import NumberInput from './NumberInput';

describe('NumberInput', () => {
    it('renders input and button', () => {
        render(<NumberInput onUpdate={jest.fn()} />);
        expect(screen.getByPlaceholderText('Search by year')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('shows initial value if provided', () => {
        render(<NumberInput numValue={2000} onUpdate={jest.fn()} />);
        expect(screen.getByDisplayValue('2000')).toBeInTheDocument();
    });

    it('calls onUpdate with number when button is clicked', () => {
        const onUpdate = jest.fn();
        render(<NumberInput onUpdate={onUpdate} />);
        fireEvent.change(screen.getByPlaceholderText('Search by year'), { target: { value: '2020' } });
        fireEvent.click(screen.getByRole('button'));
        expect(onUpdate).toHaveBeenCalledWith(2020);
    });

    it('calls onUpdate with null when input is empty and button is clicked', () => {
        const onUpdate = jest.fn();
        render(<NumberInput onUpdate={onUpdate} />);
        fireEvent.change(screen.getByPlaceholderText('Search by year'), { target: { value: '' } });
        fireEvent.click(screen.getByRole('button'));
        expect(onUpdate).toHaveBeenCalledWith(null);
    });

    it('calls onUpdate when Enter key is pressed', () => {
        const onUpdate = jest.fn();
        render(<NumberInput onUpdate={onUpdate} />);
        const input = screen.getByPlaceholderText('Search by year');
        fireEvent.change(input, { target: { value: '2021' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(onUpdate).toHaveBeenCalledWith(2021);
    });
});