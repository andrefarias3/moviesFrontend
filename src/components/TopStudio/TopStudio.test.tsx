import { render, screen } from '@testing-library/react';
import LabelTable from '../LabelTable';

const columns = [
    { key: 'name', header: 'Name' },
    { key: 'winCount', header: 'Win Count' }
];

const studiosMock = [
    { name: 'Studio A', winCount: 10 },
    { name: 'Studio B', winCount: 8 },
    { name: 'Studio C', winCount: 7 },
    { name: 'Studio D', winCount: 5 },
];

describe('Top 3 Studios in LabelTable', () => {
    it('renders only top 3 studios', () => {
        const topThreeStudios = studiosMock.slice(0, 3);

        render(
            <LabelTable
                label="Top 3 studios with winners"
                isTitle={true}
                columns={columns}
                data={topThreeStudios}
            />
        );

        expect(screen.getByText('Studio A')).toBeInTheDocument();
        expect(screen.getByText('Studio B')).toBeInTheDocument();
        expect(screen.getByText('Studio C')).toBeInTheDocument();
        expect(screen.queryByText('Studio D')).not.toBeInTheDocument();
    });
});