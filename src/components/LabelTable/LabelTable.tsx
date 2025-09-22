import './LabelTable.scss';
import { TableProps } from '../../models/types'
import Table from '../Table'

type ItemTableProps = TableProps & {
    label: string,
    isTitle?: boolean,
};

export default function LabelTable({
    label,
    columns,
    data,
    isTitle,
    pagination,
    onFilterChange
}: ItemTableProps) {
    const titleClassName = isTitle ? 'main-title' : 'table-label';

    return (
        <div className="label-table-container">
            <div className={titleClassName}>{label}</div>
            <Table columns={columns} data={data} pagination={pagination}
                onFilterChange={onFilterChange} ></Table>
        </div>
    );
}
