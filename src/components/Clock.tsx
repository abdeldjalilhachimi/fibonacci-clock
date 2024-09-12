import React, { useEffect, useState } from "react";
import _ from "underscore";
import dayjs, { Dayjs } from "dayjs";

type SquareProps = {
    squareProps: React.CSSProperties;
};

const Square: React.FC<SquareProps> = ({ squareProps }) => {
    return <div style={squareProps}></div>;
};

// Define color scheme
const fibClockColors = {
    r: "#DA3B01",
    g: "#6BB700",
    b: "#0063B1",
    w: "#DDD" // I made it like this just for making it appear well 
};

// Initialize time color mappings
const allHourSeqs: Record<number, string[][]> = {};
const allMinutesSeqs: Record<number, string[][]> = {};

function initializeAllPossibleTimeColorMapping() {
    const bitSeqs: boolean[][] = [];
    const redSeqs: string[][] = [];
    const greenSeqs: string[][] = [];
    const allTimeUnitSeq: Record<number, boolean[][]> = {};

    const maxNumOSeqs = 32;
    for (let i = 0; i < maxNumOSeqs; i++) {
        const bits = new Array(5);
        const red = new Array(5);
        const green = new Array(5);
        for (let j = 4; j >= 0; j--) {
            bits[j] = (i & (1 << j)) !== 0;
            red[j] = bits[j] ? "r" : "";
            green[j] = bits[j] ? "g" : "";
        }
        redSeqs.push(red);
        greenSeqs.push(green);
        bitSeqs.push(bits);
    }

    for (let i = 0; i < bitSeqs.length; i++) {
        const bs = bitSeqs[i];
        const timeKey = bs[0] + bs[1] + bs[2] * 2 + bs[3] * 3 + bs[4] * 5;
        if (allTimeUnitSeq[timeKey]) {
            allTimeUnitSeq[timeKey].push(bs);
            allHourSeqs[timeKey].push(redSeqs[i]);
            allMinutesSeqs[timeKey].push(greenSeqs[i]);
        } else {
            allTimeUnitSeq[timeKey] = [bs];
            allHourSeqs[timeKey] = [redSeqs[i]];
            allMinutesSeqs[timeKey] = [greenSeqs[i]];
        }
    }
}

function getColoringForTime(hh: number, mm: number) {
    const matchingHourSeqs = allHourSeqs[hh];
    const matchingMinSeqs = allMinutesSeqs[mm];
    const potentialSquareColors: string[][] = [];

    for (let i = 0; i < matchingHourSeqs.length; i++) {
        for (let j = 0; j < matchingMinSeqs.length; j++) {
            const zipped = _.zip(matchingHourSeqs[i], matchingMinSeqs[j]);
            const colorSeq = _.map(zipped, (hourMinArray) => hourMinArray[0] + hourMinArray[1]);
            potentialSquareColors.push(colorSeq);
        }
    }

    const randSel = getRandomInt(0, potentialSquareColors.length);
    return _.map(potentialSquareColors[randSel], (col) => {
        if (col === "r" || col === "g") return col;
        if (col === "rg") return "b";
        return "w";
    });
}

function getColoringForDate(dateOrig: Dayjs) {
    let hours = dateOrig.get('hours');
    const minutes = dateOrig.get('minutes');

    if (hours > 12) hours -= 12;

    let minsScaled = Math.floor(minutes / 5);
    if (minutes === 0) minsScaled = 12;

    return getColoringForTime(hours, minsScaled);
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

type ClockProps = {
    side: number;
    spc: number;
};

const Clock: React.FC<ClockProps> = ({ side, spc }) => {
    const [colors, setColors] = useState<string[]>([]);
    const [time, setTime] = useState(dayjs().format("h:mm:ss A"));

    const [currTime, setCurrTime] = useState<Dayjs>(dayjs());

    const updateSquares = (date: Dayjs) => {
        const squareColors = getColoringForDate(date);
        setColors(squareColors);
        setCurrTime(date)
    };

    const timerTick = () => {
        const dateObj = dayjs();
        setTime(dateObj.format("h:mm:ss A"));
    };

    const handleNext = () => {
        const newDate = currTime.add(5, "minute");
        updateSquares(newDate);
        setCurrTime(newDate);

    };

    const handleBack = () => {
        const newDate = currTime.subtract(5, "minute");
        updateSquares(newDate);
        setCurrTime(newDate);

    };

    useEffect(() => {
        initializeAllPossibleTimeColorMapping();
        updateSquares(currTime);
        const timeInterval = setInterval(timerTick, 1000);
        const squareInterval = setInterval(updateSquares, 30000);
        return () => {
            clearInterval(timeInterval);
            clearInterval(squareInterval);
        };
    }, []);

    if (colors.length < 5) return null;

    const clockProps: React.CSSProperties = {
        height: side * 5 + 4 * spc,
        width: side * 8 + 4 * spc,
        margin: "auto",
        position: "relative",

    };

    const squares = [
        { height: side * 2 + 2 * spc, width: side * 2, top: 0, left: 0, backgroundColor: fibClockColors[colors[2]], position: "absolute" },
        { height: side, width: side, top: 0, left: side * 2 + 2 * spc, backgroundColor: fibClockColors[colors[0]], position: "absolute" },
        { height: side, width: side, top: side + 2 * spc, left: side * 2 + 2 * spc, backgroundColor: fibClockColors[colors[1]], position: "absolute" },
        { height: side * 3, width: side * 3 + 2 * spc, bottom: 0, left: 0, backgroundColor: fibClockColors[colors[3]], position: "absolute" },
        { height: side * 5 + 4 * spc, width: side * 5, top: 0, right: 0, backgroundColor: fibClockColors[colors[4]], position: "absolute" },
    ];



    return (
        <>
            <div className="center">
                <button onClick={handleBack}>Back</button>
                <button onClick={handleNext}>Next</button>

            </div>
            <div style={clockProps}>
                {squares.map((squareProps, idx) => (
                    <Square key={idx} squareProps={squareProps} />
                ))}
            </div>
            <p className="time">{currTime.format("h:mm")}</p>

        </>
    );
};

const FibonacciClockApp: React.FC = () => {
    return (
        <div className="container">
            <Clock side={75} spc={1} />
        </div>
    );
};

export default FibonacciClockApp;
