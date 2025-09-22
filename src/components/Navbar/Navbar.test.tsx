import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

//ignore specific warnings
beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation((msg) => {
        if (
            typeof msg === 'string' &&
            msg.includes('React Router Future Flag Warning')
        ) {
            return;
        }
        // @ts-ignore
        console.warn(msg);
    });
});

describe('Navbar', () => {
    it('renders Dashboard and List links', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('List')).toBeInTheDocument();
        expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/dashboard');
        expect(screen.getByText('List').closest('a')).toHaveAttribute('href', '/list');
    });
});