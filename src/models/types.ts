export interface ProducerWithInterval {
    producer: string,
    interval: number,
    previousWin: number,
    followingWin: number
};

export interface MaxMinWinIntervalForProducersResponse {
    min: ProducerWithInterval[],
    max: ProducerWithInterval[]
};

export interface YearWithMultipleWinners {
    year: number,
    winnerCount: number
}

export interface YearsWithMultipleWinnersResponse {
    years: YearWithMultipleWinners[];
}

export interface StudioCountPerWin {
    name: string,
    winCount: number
}

export interface StudiosWithWinCountResponse {
    studios: StudioCountPerWin[]
}

export interface Column {
    key: string,
    header: string
}

export enum FilterType {
    Number,
    Boolean
}

export interface Column {
    key: string,
    header: string,
    filterType?: FilterType,
    filterValue?: any;
    filterPlaceholder?: string;
}

export interface MovieResponse {
    id: number,
    year: number,
    title: string,
    studios: string[],
    producers: string[],
    winner: boolean
}

export interface PageMovieResponse extends PageData {
    content: MovieResponse[],
    sort: SortObject,
}

export interface PageData {
    totalPages: number,
    totalElements: number,
    pageable?: PageableObject,
    numberOfElements: number,
    size: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface PageableObject {
    unpaged: boolean,
    paged: boolean,
    pageSize: number,
    pageNumber: number,
    offset: number,
    sort: SortObject
}

export interface SortObject {
    unsorted: boolean,
    sorted: boolean,
    empty: boolean
}

export interface TableProps {
    columns: Column[],
    data: Record<string, any>[],
    onFilterChange?: (filters: Record<string, any>) => void,
    pagination?: PageData
};