
type TitleProps = {
    title: string
}
const Title = ({ title }: TitleProps) => {
    return (
        <h1 className="center">{title}</h1>
    )
}

export default Title