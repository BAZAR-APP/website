import React from 'react'
import ModalDialog from '../ModalDialog/Dialog'
import Image from 'next/image'
import Button from '../Button/Button'
import { Locale } from '../../../i18n.config'

interface PriceBreakdownItem {
    description: string
    amount: number
}

interface PayRemainingModalProps {
    isOpen: boolean
    setIsOpen: () => void
    onPay: () => void
    isPaying: boolean
    lang?: Locale
    priceBreakdown: PriceBreakdownItem[]
    totalAmount: number
}

const PayRemainingModal: React.FC<PayRemainingModalProps> = ({
    isOpen,
    setIsOpen,
    onPay,
    isPaying,
    lang = 'en',
    priceBreakdown,
    totalAmount,
}) => {
    return (
        <ModalDialog isOpen={isOpen} setIsOpen={setIsOpen} className="lg:min-w-[524px] min-w-[auto]">
            <div className="text-center">
                <h3 className="lg:text-[25px] text-xl text-[16px] lg:leading-9 leading-6 font-semibold text-center text-[#19191A] mb-6">
                    {lang === 'en' ? 'Pay Remaining Amount' : 'دفع المبلغ المتبقي'}
                </h3>

                <div className="bg-[#F9FAFB] rounded-[16px] py-4 px-4 mb-6">
                    <div className="space-y-3 text-base leading-[19px] text-[#19191A]">
                        {priceBreakdown.map((item, index) => (
                            <div key={`${item.description}-${index}`} className="flex justify-between items-center">
                                <span className="flex items-center gap-1">
                                    {item.description}
                                    {(item.description === 'Refundable Deposit' || item.description === 'الوديعة القابلة للاسترداد') && (
                                        <Image src="/images/Deposit.svg" width={15} height={15} alt="Deposit icon" />
                                    )}
                                </span>
                                <span>{item.amount} {lang === 'en' ? 'KWD' : 'دينار كويتي'}</span>
                            </div>
                        ))}

                        <hr className="border-[#D1D5DB]" />
                        <div className="flex justify-between items-center font-medium text-[#19191A] text-[16px]">
                            <span>{lang === 'en' ? 'Total' : 'المجموع'}</span>
                            <span>
                                {totalAmount} {lang === 'en' ? 'KWD' : 'دينار كويتي'}
                            </span>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={onPay}
                    disabled={isPaying}
                    loading={isPaying}
                    className="cursor-pointer bg-[#29397E] !text-[#FDFDFE] py-3 rounded-lg text-[16px] font-medium !w-full"
                >
                    {lang === 'en' ? 'Pay Remaining Amount' : 'دفع المبلغ المتبقي'}
                </Button>
            </div>
        </ModalDialog>
    )
}

export default PayRemainingModal
