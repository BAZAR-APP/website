import DatePicker from "../DatePicker/DatePicker";
import ProfileBillingCard from "./ProfileBookingCard";

const billingItems = [
    {
        id: '1',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/acf987f7ff7ee4a341617415a1eb7ce6771f81f8?placeholderIfAbsent=true',
        title: 'Luxury Lakeside Retreat',
        location: 'Al Khiran',
        locationIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/559967d75f613435666d8488549a0e35de0da4eb?placeholderIfAbsent=true',
        dateRange: 'From 20 March 2025 To 24 March 2025',
        dateIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/655e8b6bfa2c95e191463cad81adac1de8857d93?placeholderIfAbsent=true',
        paymentDate: 'Paid on 4 March 2025',
        paymentIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/2209077a7b8ec777260f5f8379e083849bbf5e62?placeholderIfAbsent=true',
        amount: '220 KWD',
        paymentStatus: {
            text: '50% Paid',
            color: 'pink' as const,
            iconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/4b31efe8285f7260fc487a5ab9ee51f473284366?placeholderIfAbsent=true'
        },
        detailsLinkIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/edb8cc1bfba29c6944eba35eedb166361424c54e?placeholderIfAbsent=true'
    },
    {
        id: '2',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/acf987f7ff7ee4a341617415a1eb7ce6771f81f8?placeholderIfAbsent=true',
        title: 'Luxury Lakeside Retreat',
        location: 'Al Khiran',
        locationIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/559967d75f613435666d8488549a0e35de0da4eb?placeholderIfAbsent=true',
        dateRange: 'From 20 March 2025 To 24 March 2025',
        dateIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/655e8b6bfa2c95e191463cad81adac1de8857d93?placeholderIfAbsent=true',
        paymentDate: 'Paid on 4 March 2025',
        paymentIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/2209077a7b8ec777260f5f8379e083849bbf5e62?placeholderIfAbsent=true',
        amount: '440 KD',
        paymentStatus: {
            text: 'Fully Paid',
            color: 'emerald' as const,
            iconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/daf6794d8dad58dda355a2a2831d61abd9dcee32?placeholderIfAbsent=true'
        },
        detailsLinkIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/edb8cc1bfba29c6944eba35eedb166361424c54e?placeholderIfAbsent=true'
    },
    {
        id: '3',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/acf987f7ff7ee4a341617415a1eb7ce6771f81f8?placeholderIfAbsent=true',
        title: 'Luxury Lakeside Retreat',
        location: 'Al Khiran',
        locationIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/559967d75f613435666d8488549a0e35de0da4eb?placeholderIfAbsent=true',
        dateRange: 'From 20 March 2025 To 24 March 2025',
        dateIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/655e8b6bfa2c95e191463cad81adac1de8857d93?placeholderIfAbsent=true',
        paymentDate: 'Paid on 4 March 2025',
        paymentIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/2209077a7b8ec777260f5f8379e083849bbf5e62?placeholderIfAbsent=true',
        amount: '440 KD',
        paymentStatus: {
            text: 'Fully Paid',
            color: 'emerald' as const,
            iconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/daf6794d8dad58dda355a2a2831d61abd9dcee32?placeholderIfAbsent=true'
        },
        detailsLinkIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/edb8cc1bfba29c6944eba35eedb166361424c54e?placeholderIfAbsent=true'
    },
    {
        id: '4',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/acf987f7ff7ee4a341617415a1eb7ce6771f81f8?placeholderIfAbsent=true',
        title: 'Luxury Lakeside Retreat',
        location: 'Al Khiran',
        locationIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/559967d75f613435666d8488549a0e35de0da4eb?placeholderIfAbsent=true',
        dateRange: 'From 20 March 2025 To 24 March 2025',
        dateIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/655e8b6bfa2c95e191463cad81adac1de8857d93?placeholderIfAbsent=true',
        paymentDate: 'Paid on 4 March 2025',
        paymentIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/2209077a7b8ec777260f5f8379e083849bbf5e62?placeholderIfAbsent=true',
        amount: '220 KWD',
        paymentStatus: {
            text: '50% Paid',
            color: 'pink' as const,
            iconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/4b31efe8285f7260fc487a5ab9ee51f473284366?placeholderIfAbsent=true'
        },
        detailsLinkIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/edb8cc1bfba29c6944eba35eedb166361424c54e?placeholderIfAbsent=true'
    },
    {
        id: '5',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/acf987f7ff7ee4a341617415a1eb7ce6771f81f8?placeholderIfAbsent=true',
        title: 'Luxury Lakeside Retreat',
        location: 'Al Khiran',
        locationIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/559967d75f613435666d8488549a0e35de0da4eb?placeholderIfAbsent=true',
        dateRange: 'From 20 March 2025 To 24 March 2025',
        dateIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/655e8b6bfa2c95e191463cad81adac1de8857d93?placeholderIfAbsent=true',
        paymentDate: 'Paid on 4 March 2025',
        paymentIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/2209077a7b8ec777260f5f8379e083849bbf5e62?placeholderIfAbsent=true',
        amount: '220 KWD',
        paymentStatus: {
            text: '50% Paid',
            color: 'pink' as const,
            iconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/4b31efe8285f7260fc487a5ab9ee51f473284366?placeholderIfAbsent=true'
        },
        detailsLinkIconUrl: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/edb8cc1bfba29c6944eba35eedb166361424c54e?placeholderIfAbsent=true'
    }
];

const ProfileBilling = () => {
    return (
        <>
            <div className="flex gap-[141px] items-center self-stretch shrink-0 flex-nowrap relative z-[38]">
                <span className="h-[32px] shrink-0 basis-auto font-['Inter'] text-[25px] font-semibold leading-[32px] text-[#19191a] relative text-left whitespace-nowrap z-[39]">
                    Pick Billing Period
                </span>
                <div className="flex w-[255px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-40">
                    <DatePicker />
                </div>
            </div>

            <div className="grid gap-6">
                {billingItems.map((item) => (
                    <ProfileBillingCard key={item.id} {...item} />
                ))}
            </div>

            <div className="flex w-[617px] pt-[12px] pr-[24px] pb-[16px] pl-[24px] gap-[12px] justify-center items-center shrink-0 flex-nowrap relative z-[185]">
                <div className="flex items-center grow shrink-0 basis-0 flex-nowrap relative z-[186]">
                    <div className="flex w-[111px] pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#fdfdfe] rounded-[8px] border-solid border border-[#cfd4dc] relative overflow-hidden shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] z-[187]">
                        <div className="w-[20px] h-[20px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/CQ6yqSj5n8.png)] bg-cover bg-no-repeat relative overflow-hidden z-[188]" />
                        <div className="flex w-[63px] pt-0 pr-[2px] pb-0 pl-[2px] justify-center items-center shrink-0 flex-nowrap relative z-[189]">
                            <span className="h-[20px] shrink-0 basis-auto font-['Inter'] text-[14px] font-semibold leading-[20px] text-[#19191a] relative text-left whitespace-nowrap z-[190]">
                                Previous
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex w-[124px] gap-[2px] items-start shrink-0 flex-nowrap relative z-[191]">
                    <div className="w-[40px] h-[40px] shrink-0 bg-[#e1f2ff] rounded-[50px] relative overflow-hidden z-[192]">
                        <div className="flex w-[40px] h-[40px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] justify-center items-center flex-nowrap rounded-[8px] absolute top-0 left-0 z-[193]">
                            <span className="flex w-[7px] h-[20px] justify-center items-start shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[20px] text-[#19191a] relative text-center whitespace-nowrap z-[194]">
                                1
                            </span>
                        </div>
                    </div>
                    <div className="w-[40px] h-[40px] shrink-0 rounded-[8px] relative overflow-hidden z-[195]">
                        <div className="flex w-[40px] h-[40px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] justify-center items-center flex-nowrap rounded-[8px] absolute top-0 left-0 z-[196]">
                            <span className="flex w-[9px] h-[20px] justify-center items-start shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[20px] text-[#484a4c] relative text-center whitespace-nowrap z-[197]">
                                2
                            </span>
                        </div>
                    </div>
                    <div className="w-[40px] h-[40px] shrink-0 rounded-[8px] relative overflow-hidden z-[198]">
                        <div className="flex w-[40px] h-[40px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] justify-center items-center flex-nowrap rounded-[8px] absolute top-0 left-0 z-[199]">
                            <span className="flex w-[10px] h-[20px] justify-center items-start shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[20px] text-[#484a4c] relative text-center whitespace-nowrap z-[200]">
                                3
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-center grow shrink-0 basis-0 flex-nowrap relative z-[201]">
                    <div className="flex w-[84px] pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#fdfdfe] rounded-[8px] border-solid border border-[#cfd4dc] relative overflow-hidden shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] z-[202]">
                        <div className="flex w-[36px] pt-0 pr-[2px] pb-0 pl-[2px] justify-center items-center shrink-0 flex-nowrap relative z-[203]">
                            <span className="h-[20px] shrink-0 basis-auto font-['Inter'] text-[14px] font-semibold leading-[20px] text-[#19191a] relative text-left whitespace-nowrap z-[204]">
                                Next
                            </span>
                        </div>
                        <div className="w-[20px] h-[20px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/cYYXELTcjk.png)] bg-cover bg-no-repeat relative overflow-hidden z-[205]" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfileBilling