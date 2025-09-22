import Header from './components/Header';
import PageData from './components/PageData';
import './styles/global.scss';

export default function App() {
    return (
        <div className="app-container">
            <Header></Header>
            <PageData></PageData>
        </div>
    );
};
