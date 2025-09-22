import { useEffect, useState } from 'react';
import './PagesMovies.scss'
import { moviesService } from '../../services/MoviesService'
import LabelTable from '../LabelTable';
import StatusLabel from '../StatusLabel';
import { FilterType, PageData } from '../../models/types';

const PagesMovies = () => {
    const [data, setData] = useState<any>(null);

    const [page, setPage] = useState<number>(0);
    const [winner, setWinner] = useState<boolean | undefined>(undefined);
    const [year, setYear] = useState<number | undefined>(undefined);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const columns = [
        { key: 'id', header: 'ID' },
        { key: 'year', header: 'Year', filterType: FilterType.Number, filterValue: year, filterPlaceholder: 'Filter by year' },
        { key: 'title', header: 'Title' },
        { key: 'winner', header: 'Winner?', filterType: FilterType.Boolean, filterValue: winner }
    ];

    useEffect(() => {
        const getPageMovies = async () => {
            try {
                const fetchedData = await moviesService.fetchPageMovies(page, winner, year);
                setData(fetchedData);
            } catch (error) {
                setError(error as string);
            } finally {
                setLoading(false);
            }
        };

        getPageMovies();
    }, [page, year, winner]);

    const handleFilter = (filters: Record<string, any>) => {
        if (filters.length == 0) {
            return;
        }

        if (filters["pageNav"]) setPage(filters["pageNav"]);

        if (filters["year"] !== undefined) setYear(filters["year"]);

        if (filters["winner"] !== undefined) setWinner(filters["winner"]);

    };

    if (loading) return <StatusLabel statusMsg="Loading..."></StatusLabel>
    if (error) return <StatusLabel statusMsg={error}></StatusLabel>

    const dataContent = data?.content;

    const pageData: PageData = (({
        totalPages,
        totalElements,
        pageable,
        numberOfElements,
        size,
        number,
        first,
        last,
        empty,
    }: PageData) => ({
        totalPages,
        totalElements,
        pageable,
        numberOfElements,
        size,
        number,
        first,
        last,
        empty,
    }))(data);

    return (
        <>
            <LabelTable label="List movies" isTitle={true} columns={columns} data={dataContent}
                onFilterChange={handleFilter} pagination={pageData}></LabelTable>
        </>
    )
};

export default PagesMovies;
