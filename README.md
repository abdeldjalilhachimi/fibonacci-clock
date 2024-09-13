# Clock App

A React application that displays a clock with Fibonacci-based color coding and allows navigation through time intervals.

## Features

-   Displays a Fibonacci clock with color-coded squares.
-   Provides controls to navigate through time in 5-minute intervals.
-   Shows the current time using a \`TimeMonitor\` component.

## Installation

### Prerequisites

-   Node.js (v14 or later)
-   npm or yarn

### Steps

1. **Clone the Repository**

    \`\`\`bash
    git clone https://github.com/abdeldjalilhachimi/fibonacci-clock.git
    cd fibonacci-clock
    \`\`\`

2. **Install Dependencies**

    Using npm:

    \`\`\`bash
    npm install
    \`\`\`

    Or using yarn:

    \`\`\`bash
    yarn install
    \`\`\`

3. **Run the Application**

    Using npm:

    \`\`\`bash
    npm run dev
    \`\`\`

    Or using yarn:

    \`\`\`bash
    yarn dev
    \`\`\`

    This will start the development server and open the application in your default web browser.

## Usage

-   **Back Button**: Click to navigate 5 minutes back in time.
-   **Next Button**: Click to navigate 5 minutes forward in time.
-   **TimeMonitor**: Displays the current time in the format \`h:mm\`.

## Functions

### \`initializeAllPossibleTimeColorMapping\`

Initializes all possible color mappings for time units. This function sets up data structures that map time keys to possible color sequences for hours and minutes.

**Usage:**

\`\`\`typescript
initializeAllPossibleTimeColorMapping();
\`\`\`

### \`getColoringForDate\`

Given a \`Dayjs\` object, this function returns an array of color keys based on the provided time.

**Parameters:**

-   \`dateOrig\` (Dayjs): The date object representing the current time.

**Returns:**

-   \`FibClockColorKeys[]\`: An array of color keys representing the color coding for the time.

**Usage:**

\`\`\`typescript
const colors = getColoringForDate(dayjs());
\`\`\`

### \`generateSquareProps\`

Generates CSS properties for rendering squares based on the color keys.

**Parameters:**

-   \`colors\` (FibClockColorKeys[]): An array of color keys.

**Returns:**

-   \`CSSProperties[]\`: An array of style objects for each square.

**Usage:**

\`\`\`typescript
const squareProps = generateSquareProps(colors);
\`\`\`

## Component Overview

### \`Clock\`

The main component that manages the clock display and user interactions.

**Features:**

-   Displays control buttons for navigating time.
-   Renders squares based on current time and color mapping.
-   Includes a footer with copyright information.

### \`TimeMonitor\`

A component that displays the current time.

**Props:**

-   \`currentTime\` (string): The formatted current time.

### \`Button\`

A reusable button component.

**Props:**

-   \`label\` (string): The text displayed on the button.
-   \`onClick\` (function): Function to call when the button is clicked.

### \`TimeSquaresGenerator\`

A component that generates and renders time squares based on provided style properties.

**Props:**

-   \`squareProps\` (CSSProperties): The style properties for the square.


