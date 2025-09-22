import './Dashboard.scss';

import TopStudio from '../../components/TopStudio/TopStudio';
import DoubleTable from '../../components/DoubleTable';
import YearsMultipleWinners from '../../components/YearsMultipleWinners'
import MoviesWinnersByYear from '../../components/MoviesWinnersByYear'

export default function Dashboard() {
    return (

        <div className="result-container">
            <div className="top-row">
                <div className="card">
                    <YearsMultipleWinners></YearsMultipleWinners>
                </div>
                <div className="card">
                    {<TopStudio></TopStudio>}
                </div>
            </div>
            <div className="bottom-row">
                <div className="card">
                    <DoubleTable></DoubleTable>
                </div>
                <div className="card">
                    <MoviesWinnersByYear></MoviesWinnersByYear>
                </div>
            </div>
        </div>
    )
};
