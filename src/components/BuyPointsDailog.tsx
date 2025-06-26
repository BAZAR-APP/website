import React, { useState } from 'react'
import ModalDialog from './ModalDialog/Dialog'
import Button from './Button/Button'
import CommonInput from './CommonInput/Input'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useBuyLoyltyPointsStore } from '../../stores/useBuyLoyltyPoints'

type BuyPointsDialogProps = {
  isOpen: boolean
  setIsOpen: () => void
}

const pointOptions = [
  { points: 100, price: 2 },
  { points: 250, price: 5 },
  { points: 500, price: 9, discount: 'save 10%' },
  { points: 1000, price: 17, discount: 'save 15%' },
  { points: 2000, price: 30, discount: 'save 25%' },
]

const BuyPointsDialog: React.FC<BuyPointsDialogProps> = ({ isOpen, setIsOpen }) => {
  const { setLoyltyPoints } = useBuyLoyltyPointsStore()
  const [custom, setCustom] = useState(false)
  const [customAmount, setCustomAmount] = useState('')
  const [selected, setSelected] = useState<number | null>(null)
  const router = useRouter()
  const handleSelect = (index: number) => {
    setSelected(index)
    setCustom(false)
  }

  const handleCustomSelect = () => {
    setSelected(null)
    setCustom(true)
  }

  const calculateCustomPrice = () => {
    const points = parseInt(customAmount, 10)
    if (!points || points <= 0) return 0
    return (points * 0.02).toFixed(2)
  }

  return (
    <ModalDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="w-full md:!max-w-[600px] max-h-[calc(100vh-100px)] overflow-y-auto"
      title="Get more points to unlock discounts and upgrade your stay."
    >
      <p className="sm:text-[20px] text-[15px] leading-6 text-[#484A4C] md:pr-4">
        Let me know if you want variations based on tone—casual, premium, or playful! 4o
      </p>

      <div className="flex flex-col items-start space-y-3 my-4">
        {pointOptions.map((option, index) => (
          <button
            key={option.points}
            className={`sm:!px-4 !px-3 !py-2 border !rounded-[12px] cursor-pointer transition ${
              selected === index
                ? 'bg-[#29397E] text-white'
                : 'border-[#D0D5DD] transition text-[#344054]'
            }`}
            onClick={() => {
              console.log(option);
              setLoyltyPoints({
                points: option?.points,
                price: option?.price,
              })
              handleSelect(index)
            }}
          >
            <span className="text-[14px] leading-[17px] font-medium">
              {option.points} Points – {option.price} KD
            </span>
            {option.discount && (
              <span className="text-[14px] leading-[17px] font-medium">({option.discount})</span>
            )}
          </button>
        ))}

        <Button
          intent="transperent"
          className={`!px-4 !py-2 border !rounded-[12px] ${
            custom ? 'bg-[#29397E] text-white' : 'border-[#D0D5DD] transition'
          }`}
          onClick={handleCustomSelect}
        >
          Custom
        </Button>

        {custom && (
          <div className="relative w-full my-2.5">
            <CommonInput
              type="text"
              readonly
              placeholder="Enter points amount..."
              className="!w-full relative bg-[#F3F4F6] border border-[#D0D5DD] !rounded-md !text-sm !h-[42px]"
            />
            <span className="absolute top-3 right-3 text-[14px] leading-[17px] font-medium text-[#29397E]">
              {calculateCustomPrice()} KD
            </span>
          </div>
        )}
      </div>

      <div className="bg-[#F9FAFB] p-4 rounded-[16px] gap-4 flex-wrap mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Image src={'/images/Tiers.svg'} width={64} height={64} alt="Image" />
          <h3 className="sm:text-[20px] text-[16px] leading-[32px] font-semibold text-[#19191A]">
            Why Buy Points?
          </h3>
        </div>
        <ul className="list-disc ml-5  text-[14px] leading-[17px] font-normal text-[#484A4C] space-y-1">
          <li>Points can be redeemed for discounts on bookings and add-ons.</li>
          <li>Purchased points do not expire.</li>
          <li>The more you buy, the more you save!</li>
        </ul>
      </div>

      <Button className="w-full" onClick={() => router.push('/loyalty-points/payments')}>
        Buy Now
      </Button>
    </ModalDialog>
  )
}

export default BuyPointsDialog
