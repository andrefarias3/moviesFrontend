import React, { useEffect, useState } from 'react';
import "./MoviesWinnersByYear.scss"
import { moviesService } from '../../services/MoviesService'
import Table from '../Table';
import NumberInput from "../NumberInput";
import StatusLabel from '../StatusLabel';

const MoviesWinnersByYear: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [value, setValue] = useState<number>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [year, setYear] = useState<number>();

    const columns = [
        { key: 'id', header: 'Id' },
        { key: 'year', header: 'Year' },
        { key: 'title', header: 'Title' }
    ];

    const handleNumberUpdate = (newValue: number | null) => {
        if (newValue != null) {
            setYear(newValue);
        } else {
            setData([]);
        }
    };

    useEffect(() => {
        const getWinnersByYear = async () => {
            if (!year) {
                setLoading(false);
                return;
            }

            try {
                const fetchedData = await moviesService.fetchWinnersByYear(year);
                setData(fetchedData);
            } catch (error) {
                setError(error as string);
            } finally {
                setLoading(false);
            }
        };

        getWinnersByYear();
    }, [year]);

    //review
    if (loading) return <StatusLabel statusMsg="Loading..."></StatusLabel>
    if (error) return <StatusLabel statusMsg={error}></StatusLabel>

    return (
        <div className="search-table-container">
            <div className="main-title">List years with multiple winners</div>
            <NumberInput numValue={value} onUpdate={handleNumberUpdate}></NumberInput>
            <Table columns={columns} data={data}></Table>
        </div>
    );
};

export default MoviesWinnersByYear;
