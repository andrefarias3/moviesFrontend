import React, { useState } from 'react';

import { FilterType, TableProps } from '../../models/types'
import './Table.scss';

import Pagination from '../Pagination';

export default function Table({
    columns,
    data,
    onFilterChange,
    pagination
}: TableProps) {
    const [filters, setFilters] = React.useState<Record<string, any>>({});
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

    const handleFilterChange = (key: string, value: any) => {
        const valueAjust = value === 0 ? '0' : value;
        const newFilters = { ...filters, [key]: valueAjust };
        if (key !== 'pageNav') {
            newFilters.pageNav = '0';
        }
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const handleOptionChange = (key: string, value: any) => {
        setSelectedValue(value);
        handleFilterChange(key, value)
    };

    const anyFilter = columns.find(col => col.filterType != undefined);
    const filterHeaderClass = anyFilter ? 'filter-header' : '';

    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} className={filterHeaderClass}>
                                <div>{column.header}</div>
                                {column.filterType == FilterType.Number && (
                                    <div className="input-filter">
                                        <input id={column.key + '-filter'}
                                            type="number"
                                            value={column.filterValue}
                                            onChange={(e) => handleFilterChange(column.key, e.target.value)}
                                            placeholder={column?.filterPlaceholder}
                                            min="1998" max="2025"
                                            step="1"
                                        />
                                    </div>
                                )}
                                {column?.filterType == FilterType.Boolean && (
                                    <div className="input-filter">
                                        <select id={column.key + '-select'} className="custom-select"
                                            value={selectedValue}
                                            onChange={(e) => handleOptionChange(column.key, e.target.value)}>
                                            <option id={column.key + '-value-none'} value="">Yes/No</option>
                                            <option id={column.key + '-value-yes'} value="true">Yes</option>
                                            <option id={column.key + '-value-no'} value="false">No</option>
                                        </select>
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((row, idx) => (
                            <tr key={idx}>
                                {columns.map((col) => (
                                    <td key={col.key}>
                                        {col.key != "winner" ? row[col.key] :
                                            (row[col.key] ? "Yes" : "No")}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (<></>)}
                </tbody>
            </table>

            {pagination && pagination?.totalPages > 0 && data.length > 0 && (
                <Pagination
                    pagination={pagination}
                    onPageChange={(key, value) => handleFilterChange(key, value)}
                />
            )}
        </div>
    );
}
