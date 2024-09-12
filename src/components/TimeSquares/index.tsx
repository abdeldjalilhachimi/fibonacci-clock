import { FIBONACCI, getColorClass } from "../../utils"

type TimeSqauersGenerator = {
    clockState: number[]
}

const TimeSqauersGenerator = ({ clockState }: TimeSqauersGenerator) => {

    return (
        <div className="fibonacci-grid">
            {
                FIBONACCI.map((size, index) => (
                    <div
                        key={index}
                        className={`border ${getColorClass(clockState[index])}`}
                        style={{
                            width: `${size * 20}px`,
                            height: `${size * 20}px`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white'
                        }}
                    >
                        {clockState[index]}
                    </div>
                ))
            }
        </div >
    )
}

export default TimeSqauersGenerator