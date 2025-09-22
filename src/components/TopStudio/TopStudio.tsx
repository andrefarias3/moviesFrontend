import { useEffect, useState } from 'react';

import LabelTable from '../LabelTable'
import { moviesService } from '../../services/MoviesService'
import StatusLabel from '../StatusLabel';

export default function TopStudio() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const columns = [
        { key: 'name', header: 'Name' },
        { key: 'winCount', header: 'Win Count' }
    ];

    useEffect(() => {
        const getTopStudios = async () => {
            try {
                const fetchedData = await moviesService.fetchTopStudios();
                setData(fetchedData);
            } catch (error) {
                setError(error as string);
            } finally {
                setLoading(false);
            }
        };

        getTopStudios();
    }, []);

    if (loading) return <StatusLabel statusMsg="Loading..."></StatusLabel>
    if (error) return <StatusLabel statusMsg={error}></StatusLabel>

    const topThreeStudios = data.studios?.slice(0, 3);

    return (
        <>
            <LabelTable label="Top 3 studios with winners" isTitle={true} columns={columns} data={topThreeStudios}></LabelTable>
        </>
    );
};
