export function getColorClass(state: number) {
    switch (state) {
        case 1: return 'bg-red';
        case 2: return 'bg-green';
        case 3: return 'bg-blue';
        default: return 'bg-white';
    }
}
export function generateRandomClockState({ currentTime }: { currentTime: Date }) {
    const hours = currentTime.getHours() % 12 || 12; // Convert 0 to 12 for midnight
    const minutes = Math.floor(currentTime.getMinutes() / 5) * 5;

    const targetHourSum = hours;
    const targetMinuteSum = minutes / 5; // Each square represents 5 minutes

    const squares = [1, 1, 2, 3, 5];
    const validStates = [];

    // Generate all possible states
    for (let i = 0; i < 3 ** 5; i++) {
        const state = i.toString(3).padStart(5, '0').split('').map(Number);
        let hourSum = 0;
        let minuteSum = 0;

        for (let j = 0; j < 5; j++) {
            if (state[j] === 1 || state[j] === 3) hourSum += squares[j];
            if (state[j] === 2 || state[j] === 3) minuteSum += squares[j];
        }

        if (hourSum === targetHourSum && minuteSum === targetMinuteSum) {
            validStates.push(state);
        }
    }

    // If no valid states found, return all white
    if (validStates.length === 0) return [0, 0, 0, 0, 0];

    // Return a random valid state
    return validStates[Math.floor(Math.random() * validStates.length)];
}

export const FIBONACCI = [1, 1, 2, 3, 5];