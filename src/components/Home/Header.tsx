import { Header, SearchHeader } from "@/components"


const HomeHeader = () => {
    return (
        <div
            style={{
                backgroundImage: "url('/images/HomeBanner.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "800px",
            }}
        >
            <Header isAuthHeader={true} />
            <div
                style={{
                    backgroundImage: "url('/images/ImageBannerCard.svg')",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "640px",
                }}
                className="flex flex-col justify-center items-center">
                <div className="max-w-[80%] flex flex-col gap-[80px]">
                    <div className="text-5xl text-white font-[500] text-center max-w-[800px] ">Where Will Your Next Adventure Take You?</div>
                    <SearchHeader />
                </div>
            </div>
        </div >
    );
}

export default HomeHeader