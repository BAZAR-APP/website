import React from "react";
import ProfilePaymentCard from "./ProfilePaymentCard";


const BillingDetail = () => {
    return (
        <div className="main-container flex  pt-[24px] pr-[160px] pb-[64px] pl-[160px] flex-col gap-[40px] items-start flex-nowrap bg-[#fdfdfe] relative mx-auto my-0">
            <div className="flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative">
                <span className="h-[47px] self-stretch shrink-0 basis-auto  text-[39px] font-semibold leading-[47px] text-[#19191a] relative text-left whitespace-nowrap z-[1]">
                    Review Billing Details
                </span>
                <span className="h-[24px] shrink-0 basis-auto  text-[20px] font-normal leading-[24px] text-[#484a4c] relative text-left whitespace-nowrap z-[2]">
                    Here’s a summary of your charges before completing payment. Please
                    double-check everything.
                </span>
            </div>
            <div className="flex flex-col gap-[40px] items-start self-stretch shrink-0 flex-nowrap relative z-[3]">
                <div className="flex flex-col gap-[40px] items-start self-stretch shrink-0 flex-nowrap relative z-[4]">
                    <div className="flex gap-[40px] items-start self-stretch shrink-0 flex-nowrap relative z-[5]">
                        <div className="flex flex-col gap-[40px] justify-center items-start grow shrink-0 basis-0 flex-nowrap relative z-[6]">
                            <div className="flex w-[473px] flex-col gap-[21px] items-end shrink-0 flex-nowrap relative z-[7]">
                                <div className="h-[275px] self-stretch shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/zMiejEgMLZ.png)] bg-cover bg-no-repeat rounded-[24px] relative z-[8]" />
                                <div className="flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[9]">
                                    <div className="flex gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-10">
                                        <span className="h-[24px] shrink-0 basis-auto  text-[16px] font-medium leading-[24px] text-[#19191a] relative text-left whitespace-nowrap z-[11]">
                                            Luxury Lakeside Retreat
                                        </span>
                                        <div className="flex w-[101px] pt-[4px] pr-[6px] pb-[4px] pl-[6px] gap-[2px] justify-center items-center shrink-0 flex-nowrap bg-[#e1f2ff] rounded-[6px] relative z-[12]">
                                            <div className="w-[16px] h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/BmAxdpDULe.png)] bg-cover bg-no-repeat relative overflow-hidden z-[13]" />
                                            <span className="flex w-[71px] h-[17px] justify-center items-start shrink-0 basis-auto  text-[14px] font-normal leading-[16.943px] text-[#29397e] relative text-center whitespace-nowrap z-[14]">
                                                200 Points
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex w-[79px] gap-[4px] items-center shrink-0 flex-nowrap relative z-[15]">
                                        <div className="w-[16px] h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/sKqg2rAptF.png)] bg-cover bg-no-repeat relative overflow-hidden z-[16]" />
                                        <span className="h-[17px] shrink-0 basis-auto  text-[14px] font-normal leading-[17px] text-[#8e8e93] relative text-left whitespace-nowrap z-[17]">
                                            Al Khiran
                                        </span>
                                    </div>
                                    <div className="flex items-start self-stretch shrink-0 flex-nowrap relative z-[18]">
                                        <span className="flex w-[282px] h-[17px] justify-start items-center shrink-0 basis-auto  text-[14px] font-normal leading-[17px] text-[#8e8e93] relative text-left whitespace-nowrap z-[19]">
                                            5-7 guests · Entire Home · 5 beds · 4 bath{" "}
                                        </span>
                                        <span className="h-[17px] shrink-0 basis-auto  text-[14px] font-normal leading-[17px] text-[#8e8e93] relative text-left whitespace-nowrap z-20">
                                            · Wifi · Free Parking
                                        </span>
                                    </div>
                                    <div className="flex w-[139px] h-[17px] gap-[4px] justify-end items-center shrink-0 flex-nowrap relative z-[21]">
                                        <div className="w-[119px] shrink-0  text-[14px] font-medium leading-[17px] relative text-left whitespace-nowrap z-[22]">
                                            <span className="text-[14px] font-medium leading-[16.943px] text-[#29397e] relative text-left underline">
                                                Download Invoice
                                            </span>
                                        </div>
                                        <div className="w-[16px] h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/6igNAhG2Ei.png)] bg-cover bg-no-repeat relative overflow-hidden z-[23]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[24]">
                        <span className="h-[32px] self-stretch shrink-0 basis-auto  text-[25px] font-semibold leading-[32px] text-[#19191a] relative text-left whitespace-nowrap z-[25]">
                            Dates
                        </span>
                        <div className="flex w-[396px] items-start shrink-0 flex-nowrap relative z-[26]">
                            <div className="flex pt-[8px] pr-[8px] pb-[8px] pl-[8px] flex-col gap-[4px] items-start grow shrink-0 basis-0 flex-nowrap bg-[#fdfdfe] relative shadow-[-1px_0_0_0_#d1d5db_inset] z-[27]">
                                <span className="h-[16px] self-stretch shrink-0 basis-auto  text-[10px] font-semibold leading-[16px] text-[#19191a] relative text-left whitespace-nowrap z-[28]">
                                    CHECK-IN
                                </span>
                                <span className="h-[17px] self-stretch shrink-0 basis-auto  text-[14px] font-normal leading-[16.943px] text-[#9ea0a2] relative text-left whitespace-nowrap z-[29]">
                                    20/3/2025
                                </span>
                            </div>
                            <div className="flex pt-[8px] pr-[8px] pb-[8px] pl-[8px] flex-col gap-[4px] items-start grow shrink-0 basis-0 flex-nowrap bg-[#fdfdfe] relative z-30">
                                <span className="h-[16px] self-stretch shrink-0 basis-auto  text-[10px] font-semibold leading-[16px] text-[#19191a] relative text-left whitespace-nowrap z-[31]">
                                    CHECKOUT
                                </span>
                                <span className="h-[17px] self-stretch shrink-0 basis-auto  text-[14px] font-normal leading-[16.943px] text-[#9ea0a2] relative text-left whitespace-nowrap z-[32]">
                                    24/3/2025
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[33]">
                        <span className="h-[32px] self-stretch shrink-0 basis-auto  text-[25px] font-semibold leading-[32px] text-[#19191a] relative text-left whitespace-nowrap z-[34]">
                            Add-ons
                        </span>
                        <div className="flex w-[322px] h-[40px] pt-[8px] pr-0 pb-[8px] pl-0 gap-[12px] items-center shrink-0 flex-nowrap relative z-[35]">
                            <div className="flex w-[248px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[36]">
                                <div className="w-[24px] h-[24px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/YhssJRufnL.png)] bg-cover bg-no-repeat relative overflow-hidden z-[37]" />
                                <span className="h-[19px] shrink-0 basis-auto  text-[16px] font-normal leading-[19px] text-[#19191a] relative text-left whitespace-nowrap z-[38]">
                                    BBQ setup with private chef
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <ProfilePaymentCard
                    title="Total Payments"
                    paymentStatusText="Fully Paid"
                    paymentStatusColor="#10b981"
                    paymentStatusBg="#d1fae5"
                    paymentStatusIcon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/8i2sCoqwjM.png"
                    items={[
                        { label: '100 KWD x 4 nights', value: '400 KWD' },
                        { label: 'Refundable Deposit', value: '200 KWD' },
                        { label: 'Flower Arrangement', value: '30 KWD' },
                    ]}
                    total="440"
                    paidAmountText="Paid Amount 100%"
                    paidAmount="440"
                    paidIcon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/aq6u4K09n6.png"
                />

                <ProfilePaymentCard
                    title="Total Payments"
                    paymentStatusText="50% Paid"
                    paymentStatusColor="#ec4899"
                    paymentStatusBg="#fce7f3"
                    paymentStatusIcon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/NjB7UoWt4u.png"
                    items={[
                        { label: '100 KWD x 4 nights', value: '400 KWD' },
                        { label: 'Flower Arrangement', value: '30 KWD' },
                    ]}
                    total="215"
                    paidAmountText="Paid Amount 50%"
                    paidAmount="215"
                    paidIcon="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/aq6u4K09n6.png"
                />


            </div>
        </div>
    );
}

export default BillingDetail