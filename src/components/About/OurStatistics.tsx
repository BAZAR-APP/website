import React from 'react'
import AnimatedCounter from '../AnimatedCounter'

const OurStatistics = () => {
  return (
    <div className="w-full bg-[#29397e] px-4 md:px-16 py-16">
      <div className="mx-auto flex flex-col gap-16 items-center">
        <div className="flex flex-col gap-8 text-white w-full">
          <div className="flex flex-col gap-6">
            <h2 className="font-semibold text-[clamp(32px,6vw,39px)] leading-tight">
              Our Impact in Numbers
            </h2>
            <p className="font-['Inter'] text-[clamp(16px,4vw,20px)] leading-[1.5] max-w-3xl">
              Trusted by thousands — here’s what makes us the go-to choice for chalet bookings.
            </p>
          </div>

          <div className="font-['Inter'] text-[clamp(16px,4vw,20px)] leading-[1.5] max-w-3xl">
            Every number tells a story — of happy guests, seamless bookings, and unforgettable
            stays. Our growing community, high satisfaction rates, and trusted service reflect our
            commitment to delivering the best chalet experience, every time.
          </div>

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-8 mt-8 w-full justify-between">
            <div className="flex flex-col items-start gap-2 w-full sm:w-1/3">
              <span className="text-[clamp(36px,10vw,72px)] font-extrabold leading-none">
                <AnimatedCounter target={10000} />
              </span>
              <span className="text-[clamp(16px,4vw,20px)] leading-tight">Successful Bookings</span>
            </div>
            <div className="flex flex-col items-start gap-2 w-full sm:w-1/3">
              <span className="text-[clamp(36px,10vw,72px)] font-extrabold leading-none">
                {' '}
                <AnimatedCounter target={3000} />
              </span>
              <span className="text-[clamp(16px,4vw,20px)] leading-tight">
                Active Loyalty Members
              </span>
            </div>
            <div className="flex flex-col items-start gap-2 w-full sm:w-1/3">
              <span className="text-[clamp(36px,10vw,72px)] font-extrabold leading-none">
                {' '}
                <AnimatedCounter target={400} />
              </span>
              <span className="text-[clamp(16px,4vw,20px)] leading-tight">
                Unique Chalets Listed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurStatistics
