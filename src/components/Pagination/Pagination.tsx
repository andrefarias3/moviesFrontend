import { FaStepBackward, FaStepForward } from 'react-icons/fa';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';

type PaginationProps = {
    pagination: {
        number: number;
        totalPages: number;
        first: boolean;
        last: boolean;
    };
    onPageChange: (key: string, value: any) => void;
};

function getPageNumbers(number: number, totalPages: number) {
    let start = Math.max(0, number - 2);
    let end = Math.min(totalPages - 1, number + 2);

    if (end - start < 4) {
        if (start === 0) {
            end = Math.min(totalPages - 2, start + 4);
        } else if (end === totalPages - 2) {
            start = Math.max(0, end - 4);
        }
    }

    if (end == -1) end = 0;

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
}


export default function Pagination({
    pagination,
    onPageChange
}: PaginationProps) {
    const { number, totalPages, first, last } = pagination;
    const pages = getPageNumbers(number, totalPages);

    return (
        <div id="page-control" className="pagination-container">
            <button data-testid="btn-page-first" disabled={first} onClick={() => onPageChange("pageNav", "0")}>
                <FaStepBackward />
            </button>
            <button data-testid="btn-page-preview" disabled={first} onClick={() => onPageChange("pageNav", number - 1)}>
                <BsCaretLeftFill />
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    className={p === number ? "active-page" : ""}
                    onClick={() => onPageChange("pageNav", p)}>
                    {p + 1}
                </button>
            ))}

            <button data-testid="btn-page-next" disabled={last}
                onClick={() => onPageChange("pageNav", number + 1)}>
                <BsCaretRightFill />
            </button>
            <button data-testid="btn-page-last" disabled={last}
                onClick={() => onPageChange("pageNav", totalPages - 1)}>
                <FaStepForward />
            </button>
        </div>
    );
};
