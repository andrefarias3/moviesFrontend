import { render, screen } from '@testing-library/react';
import LabelTable from '../LabelTable';

const columns = [
    { key: 'year', header: 'Years' },
    { key: 'winnerCount', header: 'Win Count' }
];

const yearsTest = [
    { year: 9999, winnerCount: 99 },
    { year: 9999, winnerCount: 99 }
];

describe('LabelTable (YearsMultipleWinners)', () => {
    it('renders years and winnerCount fields from yearsTest data', () => {
        render(
            <LabelTable
                label="List years with multiple winners"
                isTitle={true}
                columns={columns}
                data={yearsTest}
            />
        );

        expect(screen.getAllByText('9999').length).toBe(2);
        expect(screen.getAllByText('99').length).toBe(2);

        expect(screen.getByText('Years')).toBeInTheDocument();
        expect(screen.getByText('Win Count')).toBeInTheDocument();
    });
});