import { useRef, useState } from 'preact/hooks';
import './style.css';

export function StopWatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    let timeInterval = useRef(null);

    const handleStartStop = () => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(timeInterval.current);
            return;
        }
        clearInterval(timeInterval.current);
        setIsRunning(true);
        timeInterval.current = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
    };

    const handleReset = () => {
        setIsRunning(false);
        clearInterval(timeInterval.current);
        setTime(0);
    };

    const formatTime = (time: number): string => {
        const hours = Math.floor(time / (60 * 60));
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <div class="stop-watch">
            <div class={'time'}>
                <h1>{formatTime(time)}</h1>
            </div>
            <div class="controls">
                <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
                <button disabled={isRunning} onClick={handleReset}>
                    Reset
                </button>
            </div>
        </div>
    );
}
