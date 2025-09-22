import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';
import { FilterType } from '../../models/types';

const columns = [
    { key: 'year', header: 'Year', filterType: FilterType.Number, filterValue: '', filterPlaceholder: 'Filter by year' },
    { key: 'winner', header: 'Winner', filterType: FilterType.Boolean, filterValue: '' },
    { key: 'movie', header: 'Movie' }
];

const data = [
    { key: 1, year: 2000, winner: true, movie: 'Movie A' },
    { key: 2, year: 2001, winner: false, movie: 'Movie B' }
];

describe('Table', () => {
    it('renders table headers and rows', () => {
        render(<Table columns={columns} data={data} />);
        expect(screen.getByText('Year')).toBeInTheDocument();
        expect(screen.getByText('Winner')).toBeInTheDocument();
        expect(screen.getByText('Movie')).toBeInTheDocument();
        expect(screen.getByText('2000')).toBeInTheDocument();
        expect(screen.getByText('Movie A')).toBeInTheDocument();
        expect(screen.getAllByText('Yes').length).toBeGreaterThan(0);
        expect(screen.getAllByText('No').length).toBeGreaterThan(0);
    });

    it('renders filters', () => {
        render(<Table columns={columns} data={data} />);
        expect(screen.getByPlaceholderText('Filter by year')).toBeInTheDocument();
        expect(screen.getByText('Yes/No')).toBeInTheDocument();
    });

    it('calls onFilterChange when filter changes', () => {
        const onFilterChange = jest.fn();
        render(<Table columns={columns} data={data} onFilterChange={onFilterChange} />);
        fireEvent.change(screen.getByPlaceholderText('Filter by year'), { target: { value: '2001' } });
        expect(onFilterChange).toHaveBeenCalled();
    });

    it('if data is empty, does not have rows', () => {
        render(<Table columns={columns} data={[]} />);
        expect(screen.queryByText('Movie A')).not.toBeInTheDocument();
    });
});