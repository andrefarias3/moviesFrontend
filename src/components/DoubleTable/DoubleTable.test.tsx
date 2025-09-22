import { render, screen } from '@testing-library/react';
import LabelTable from '../LabelTable';

const columns = [
    { key: 'producer', header: 'Producer' },
    { key: 'interval', header: 'Interval' },
    { key: 'previousWin', header: 'Previous Year' },
    { key: 'followingWin', header: 'Following Year' }
];

const testData = {
    max: [
        {
            producer: "Producer Name",
            interval: 99,
            previousWin: 1900,
            followingWin: 1999
        }
    ],
    min: [
        {
            producer: "Producer Name",
            interval: 9,
            previousWin: 2018,
            followingWin: 2019
        }
    ]
};

describe('LabelTable (DoubleTable max/min)', () => {
    it('renders max and min tables with correct data', () => {
        render(
            <>
                <LabelTable
                    label="Maximum"
                    isTitle={false}
                    columns={columns}
                    data={testData.max}
                />
                <LabelTable
                    label="Minimum"
                    isTitle={false}
                    columns={columns}
                    data={testData.min}
                />
            </>
        );

        expect(screen.getByText('Maximum')).toBeInTheDocument();
        expect(screen.getByText('Minimum')).toBeInTheDocument();

        // Producer Name appears in both tables
        expect(screen.getAllByText('Producer Name').length).toBe(2);

        // Check maxData row
        expect(screen.getByText('99')).toBeInTheDocument();
        expect(screen.getByText('1900')).toBeInTheDocument();
        expect(screen.getByText('1999')).toBeInTheDocument();

        // Check minData row
        expect(screen.getByText('9')).toBeInTheDocument();
        expect(screen.getByText('2018')).toBeInTheDocument();
        expect(screen.getByText('2019')).toBeInTheDocument();
    });
});