export type ClockProps = {
    side: number;
    spc: number;
};

export const fibClockColors = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF",
    white: "#FFF"
} as const;

export type FibClockColorKeys = keyof typeof fibClockColors;

export type SquareProps = {
    squareProps: React.CSSProperties;
};

