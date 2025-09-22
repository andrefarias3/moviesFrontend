import './PageData.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Dashboard from '../../pages/Dashboard';
import List from '../../pages/List/';

const PageData = () => {
    return (
        <div className="page-container">
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/list" element={<List />} />
                </Routes>
            </div>
        </div>
    );
};

export default PageData;

