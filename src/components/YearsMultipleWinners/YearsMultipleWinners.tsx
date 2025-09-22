import { useEffect, useState } from 'react';
import { moviesService } from '../../services/MoviesService'
import LabelTable from '../LabelTable';
import StatusLabel from '../StatusLabel';

export default function YearsMultipleWinners() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const columns = [
        { key: 'year', header: 'Years' },
        { key: 'winnerCount', header: 'Win Count' }
    ];

    useEffect(() => {
        const getWinners = async () => {
            try {
                const fetchedData = await moviesService.fetchMultipleWinners();
                setData(fetchedData);
            } catch (error) {
                setError(error as string);
            } finally {
                setLoading(false);
            }
        };

        getWinners();
    }, []);

    if (loading) return <StatusLabel statusMsg="Loading..."></StatusLabel>
    if (error) return <StatusLabel statusMsg={error}></StatusLabel>

    const years = data?.years;

    return (
        <>
            <LabelTable label="List years with multiple winners" isTitle={true} columns={columns} data={years}></LabelTable>
        </>
    );
};
