import './index.css';
import Title from "./components/Title";
import FibonacciClockApp from './components/Clock';

const App = () => {
    return (
        <div className="container">
            <Title title="Fibonacci Clock" />
            <FibonacciClockApp />
        </div>
    );
};



export default App;

