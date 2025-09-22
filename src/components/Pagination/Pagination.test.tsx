import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
    const defaultProps = {
        pagination: {
            number: 2,
            totalPages: 5,
            first: false,
            last: false,
        },
        onPageChange: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders page buttons', () => {
        render(<Pagination {...defaultProps} />);
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('calls onPageChange when a page button is clicked', () => {
        render(<Pagination {...defaultProps} />);
        fireEvent.click(screen.getByText('4'));
        expect(defaultProps.onPageChange).toHaveBeenCalledWith('pageNav', 3);
    });

    it('disables first/prev buttons when first is true', () => {
        render(<Pagination {...defaultProps} pagination={{ ...defaultProps.pagination, first: true }} />);
        expect(screen.getByTestId('btn-page-first')).toBeDisabled();
        expect(screen.getByTestId('btn-page-preview')).toBeDisabled();
    });

    it('disables next/last buttons when last is true', () => {
        render(<Pagination {...defaultProps} pagination={{ ...defaultProps.pagination, last: true }} />);
        expect(screen.getByTestId('btn-page-next')).toBeDisabled();
        expect(screen.getByTestId('btn-page-last')).toBeDisabled();
    });

    it('highlights the active page', () => {
        render(<Pagination {...defaultProps} />);
        const activeButton = screen.getByText('3');
        expect(activeButton).toHaveClass('active-page');
    });
});