import { useEffect, useState } from 'react';
import './DoubleTable.scss';
import { moviesService } from '../../services/MoviesService'
import { MaxMinWinIntervalForProducersResponse } from '../../models/types'
import StatusLabel from '../StatusLabel'
import LabelTable from '../LabelTable';

const DoubleTable = () => {
    const [data, setData] = useState<MaxMinWinIntervalForProducersResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const columns = [
        { key: 'producer', header: 'Producer' },
        { key: 'interval', header: 'Interval' },
        { key: 'previousWin', header: 'Previous Year' },
        { key: 'followingWin', header: 'Following Year' }
    ];

    useEffect(() => {
        const getInterval = async () => {
            try {
                const fetchedData = await moviesService.fetchProducersInterval()
                setData(fetchedData)
            } catch (error) {
                setError(error as string);
            } finally {
                setLoading(false)
            }
        }

        getInterval()
    }, [])

    if (loading) return <StatusLabel statusMsg="Loading..."></StatusLabel>
    if (error) return <StatusLabel statusMsg={error}></StatusLabel>

    const maxData = data ? data.max : [];
    const minData = data ? data.min : [];

    return (
        <div className="double-table-container">
            <div className="main-label">Producers with longest and shortest interval between wins</div>
            <LabelTable
                label="Maximum"
                isTitle={false}
                columns={columns}
                data={maxData}
            />
            <LabelTable
                label="Minimum"
                isTitle={false}
                columns={columns}
                data={minData}
            />
        </div>
    )
}

export default DoubleTable;