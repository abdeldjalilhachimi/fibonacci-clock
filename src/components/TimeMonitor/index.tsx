import { format } from 'date-fns'

type TimeMonitorProps = {
    currentTime: Date
}

const TimeMonitor = ({ currentTime }: TimeMonitorProps) => {
    return (
        <p>Current Time: {format(currentTime, "HH:mm")}</p>
    )
}

export default TimeMonitor