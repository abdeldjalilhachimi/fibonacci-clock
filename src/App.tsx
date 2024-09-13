import Title from "./components/Title";
import { Clock } from './components/Clock';
import './index.css';

const App = () => {
    return (
        <div className="container">
            <header >
                <Title title="Fibonacci Clock" />
            </header>
            <Clock />
            <footer>
                &copy; 2024 Abdeldjalil Hachimi. All rights reserved.
            </footer>
        </div>
    );
};



export default App;

