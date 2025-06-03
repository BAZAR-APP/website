import Image from "next/image"

type CardProps = {
    backgroundImage?: string
    backgroundColor?: string
    rotate?: string
    className?: string
    position?: 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static'
    style?: React.CSSProperties
    width?: string
    height?: string
}
const Card: React.FC<CardProps> = ({
    backgroundImage,
    backgroundColor = '#FFFFFF',
    rotate = 'rotate-0',
    className = '',
    position = 'relative',
    style = {},
    width = 'md:w-[400px] w-[250px]',
    height = 'h-[261px]',
}) => {
    const backgroundLayer = backgroundImage
        ? `linear-gradient(0deg, rgba(41, 57, 126, 0.4), rgba(41, 57, 126, 0.4)), url(${backgroundImage})`
        : backgroundColor
    return (
        <div
            className={`rounded-[19.9395px] transform ${rotate} ${width} ${height} ${className}`}
            style={{
                position: position,
                background: backgroundLayer,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                ...style,
            }}
        >
            <div className="w-full h-full flex items-center justify-center">
                <Image src={"/images/Logo-white.svg"} alt="logo" width={148} height={74} />
            </div>
        </div>
    )
}
const BazarImageCard: React.FC = () => {
    const cards = [
        {
            id: 1,
            backgroundImage:
                '/images/bazarCard1.jpg',
            rotate: '-rotate-[5.05deg]',
            className: 'z-10 md:-right-15 sm:-right-10',
        },
        {
            id: 2,
            backgroundColor: '#1E2A78',
            rotate: '-rotate-[16.84deg]',
            className: 'sm:top-5 top-0',
        },
        {
            id: 3,
            backgroundImage:
                '/images/bazarCard3.jpg',
            rotate: 'sm:rotate-[24.89deg] rotate-[15.89deg]',
            className: 'sm:-left-7 -left-0 top-2.5',
        },
    ]
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center pt-15 md:-ml-10 md:max-w-[95%] max-w-[100%]">
            {cards.map((items) => (
                <Card key={items?.id} {...items} />
            ))}
        </div>
    )
}
export default BazarImageCard