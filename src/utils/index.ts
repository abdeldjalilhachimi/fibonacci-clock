import { Dayjs } from "dayjs";
import _ from "underscore";
import { FibClockColorKeys, fibClockColors } from "../types";
import { CSSProperties } from "react";

const allHourSeqs: Record<number, string[][]> = {};
const allMinutesSeqs: Record<number, string[][]> = {};


export const SQUARE_RATIO = {
    side: 75,
    spc: .5
}


export function initializeAllPossibleTimeColorMapping() {
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
            red[j] = bits[j] ? "red" : "";
            green[j] = bits[j] ? "green" : "";
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

export function getColoringForTime(hh: number, mm: number) {
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
        if (col === "red" || col === "green") return col;
        if (col === "redgreen") return "blue";
        return "white";
    });
}

export function getColoringForDate(dateOrig: Dayjs) {
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


export const clockProps: React.CSSProperties = {
    height: SQUARE_RATIO.side * 5 + 4 * SQUARE_RATIO.spc,
    width: SQUARE_RATIO.side * 8 + 4 * SQUARE_RATIO.spc,
    margin: "auto",
    position: "relative",
};


export const generateSquareProps = (colors: FibClockColorKeys[]): CSSProperties[] => [
    { height: SQUARE_RATIO.side * 2 + 2 * SQUARE_RATIO.spc, width: SQUARE_RATIO.side * 2, top: 0, left: 0, backgroundColor: fibClockColors[colors[2]], position: "absolute" },
    { height: SQUARE_RATIO.side, width: SQUARE_RATIO.side, top: 0, left: SQUARE_RATIO.side * 2 + 2 * SQUARE_RATIO.spc, backgroundColor: fibClockColors[colors[0]], position: "absolute" },
    { height: SQUARE_RATIO.side, width: SQUARE_RATIO.side, top: SQUARE_RATIO.side + 2 * SQUARE_RATIO.spc, left: SQUARE_RATIO.side * 2 + 2 * SQUARE_RATIO.spc, backgroundColor: fibClockColors[colors[1]], position: "absolute" },
    { height: SQUARE_RATIO.side * 3, width: SQUARE_RATIO.side * 3 + 2 * SQUARE_RATIO.spc, bottom: 0, left: 0, backgroundColor: fibClockColors[colors[3]], position: "absolute" },
    { height: SQUARE_RATIO.side * 5 + 4 * SQUARE_RATIO.spc, width: SQUARE_RATIO.side * 5, top: 0, right: 0, backgroundColor: fibClockColors[colors[4]], position: "absolute" },
];