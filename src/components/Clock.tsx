import { useEffect, useState, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import TimeMonitor from "./TimeMonitor";
import Button from "./Button";
import { clockProps, generateSquareProps, getColoringForDate, initializeAllPossibleTimeColorMapping } from "../utils";
import TimeSquaresGenerator from "./TimeSquares";
import { FibClockColorKeys } from "../types";

export const Clock = () => {
    const [colors, setColors] = useState<FibClockColorKeys[]>([]);
    const [currTime, setCurrTime] = useState<Dayjs>(dayjs());

    const updateSquares = useCallback((date: Dayjs) => {
        const squareColors = getColoringForDate(date) as FibClockColorKeys[];
        setColors(squareColors);
        setCurrTime(date);
    }, []);

    const handleTimeChange = (minutes: number) => {
        const newDate = currTime.add(minutes, "minute");
        updateSquares(newDate);
    };

    useEffect(() => {
        initializeAllPossibleTimeColorMapping();
        updateSquares(currTime);

        const squareInterval = setInterval(() => updateSquares(dayjs()), 30000);
        return () => clearInterval(squareInterval);
    }, [currTime, updateSquares]);

    if (colors.length < 5) return null; // Render nothing until colors are available

    const squares = generateSquareProps(colors)

    return (
        <>
            <div style={clockProps}>
                {squares.map((squareProps, idx) => (
                    <TimeSquaresGenerator key={idx} squareProps={squareProps} />
                ))}
            </div>
            <TimeMonitor currentTime={currTime.format("h:mm")} />
            <div className="center">
                <Button label="Back" onClick={() => handleTimeChange(-5)} />
                <Button label="Next" onClick={() => handleTimeChange(5)} />
            </div>
        </>
    );
};
