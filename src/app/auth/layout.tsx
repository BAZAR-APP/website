"use client"


const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-[100vh] flex p-4" >
            <div className="w-[50%]">
                {children}
            </div>
            <div className='flex flex-col items-center justify-center px-[64px] w-[50%]'
                style={{
                    backgroundImage: `url('/images/AuthBanner.svg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: "24px",
                }}>
                <img
                    src="/images/Logo-white.svg"
                    alt="Bazar"
                />
                <h4 className="text-[#FDFDFE] text-[48px] font-normal">Your Escape by the Sea</h4>
                <p className="text-[#FDFDFE] text-[16px] font-normal">Discover our handpicked sea villas—perfect for serene getaways and unforgettable moments.</p>
            </div>

        </div >
    );
};

export default AuthLayout;
