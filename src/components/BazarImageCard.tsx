import Image from "next/image";

type CardProps = {
    backgroundImage?: string;
    backgroundColor?: string;
    rotate?: string;
    className?: string;
    position?: 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static';
    style?: React.CSSProperties;
    width?: string;
    height?: string;
};

export const Card: React.FC<CardProps> = ({
    backgroundImage,
    backgroundColor = '#FFFFFF',
    rotate = 'rotate-0',
    className = '',
    position = 'relative',
    style = {},
    width = 'md:w-[400px] w-[100%]',
    height = 'h-[261px]',
}) => {
    const backgroundLayer = backgroundImage
        ? `linear-gradient(0deg, rgba(41, 57, 126, 0.4), rgba(41, 57, 126, 0.4)), url(${backgroundImage})`
        : backgroundColor;

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
                <Image src={"/images/Logo-white.svg"} alt="logo" width={148} height={74} className="w-full sm:w-auto" />
            </div>
        </div>
    );
};

const BazarImageCard: React.FC = () => {
    const cards = [
        {
            id: 1,
            backgroundImage: '/images/bazarCard1.jpg',
            rotate: 'rotate-0 lg:-rotate-[5.05deg]',
            className: 'z-10 md:-right-15 sm:-right-10 w-[100%] md:w-atuo shadow-[0px_4.98px_4.98px_0px_#00000033]',
        },
        {
            id: 2,
            backgroundColor: '#1E2A78',
            rotate: 'rotate-0 lg:-rotate-[16.84deg]',
            className: 'top-0 hidden lg:block shadow-[0px_4.98px_4.98px_0px_#00000033]',
        },
        {
            id: 3,
            backgroundImage: '/images/bazarCard3.jpg',
            rotate: 'rotate-0 lg:rotate-[24.89deg]',
            className: 'top-2.5 hidden lg:block shadow-[0px_4.98px_4.98px_0px_#00000033]',
        },
    ];

    return (
        <div className="flex flex-col lg:flex-row xl:items-start item-center justify-start pt-15 md:-ml-10 max-w-full">
            {cards.map((item) => (
                <Card key={item.id} {...item} />
            ))}
        </div>
    );
};


export default BazarImageCard;