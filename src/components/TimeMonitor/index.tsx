
type TimeMonitorProps = {
    currentTime: string
}

const TimeMonitor = ({ currentTime }: TimeMonitorProps) => {
    return (
        <p className="time">{currentTime}</p>
    )
}

export default TimeMonitor