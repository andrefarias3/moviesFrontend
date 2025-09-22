import axios, { AxiosError } from 'axios';

import { StudiosWithWinCountResponse, YearsWithMultipleWinnersResponse, MaxMinWinIntervalForProducersResponse, MovieResponse, PageMovieResponse } from "../models/types"

type ApiErrorResponse = {
    status?: string,
    timestamp: string;
    message: string
}

const baseUrl = 'https://challenge.outsera.tech/api/movies'

export const moviesService = {

    async fetchMultipleWinners() {
        try {
            const response = await axios.get<YearsWithMultipleWinnersResponse>(baseUrl + '/yearsWithMultipleWinners');
            return response.data;
        } catch (error) {
            console.error('Error fetching Data', error);
            throw errorMessage(error as AxiosError);
        }
    },

    async fetchTopStudios() {
        try {
            const response = await axios.get<StudiosWithWinCountResponse>(baseUrl + '/studiosWithWinCount');
            return response.data;
        } catch (error) {
            throw errorMessage(error as AxiosError);
        }
    },
    async fetchProducersInterval() {
        try {
            const response = await axios.get<MaxMinWinIntervalForProducersResponse>(baseUrl + '/maxMinWinIntervalForProducers');
            return response.data;
        } catch (error) {
            throw errorMessage(error as AxiosError);
        }
    },

    async fetchWinnersByYear(year: number) {
        try {
            const response = await axios.get<MovieResponse>(baseUrl + '/winnersByYear?year=' + year);
            return response.data;
        } catch (error) {
            throw errorMessage(error as AxiosError);
        }
    },

    async fetchPageMovies(page: number, winner?: boolean, year?: number) {
        try {
            let urlBuild = baseUrl + '?page=' + page + '&size=' + 10;

            if (winner !== undefined) {
                urlBuild += '&winner=' + winner;
            }

            if (year) {
                urlBuild += '&year=' + year;
            }

            const response = await axios.get<PageMovieResponse>(urlBuild);

            return response.data;
        } catch (error) {
            throw errorMessage(error as AxiosError);
        }
    }
};

const formatTimestamp = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const errorMessage = (error: AxiosError): string => {
    const now = new Date();
    const formattedTimestamp = formatTimestamp(now);

    const apiError: ApiErrorResponse = {
        status: error?.status?.toLocaleString(),
        message: error.message,
        timestamp: formattedTimestamp
    }

    console.log(apiError);
    return apiError.message;
}
