import DatePicker from "../DatePicker/DatePicker";
import Pagination from "../Pagination";
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

interface ProfileBillingProps {
  messages: {
    pick_billing_period: string;
  };
}

const ProfileBilling: React.FC<ProfileBillingProps> = ({ messages }) => {
    return (
        <>
            <div className="flex gap-[32px] md:gap-[141px] flex-col md:flex-row md:items-center self-stretch shrink-0 flex-nowrap relative z-[38]  mb-[20px] md:mb-[40px]">
                <span className="h-[32px] shrink-0 basis-auto text-[25px] font-semibold leading-[32px] text-[#19191a] relative text-left whitespace-nowrap z-[39]">
                    {messages.pick_billing_period}
                </span>
                <div className="flex max-w-[255px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-40">
                    <DatePicker />
                </div>
            </div>

            <div className="grid gap-6">
                {billingItems.map((item) => (
                    <ProfileBillingCard key={item.id} {...item} />
                ))}
            </div>
            <Pagination currentPage={1} totalPages={1} onPageChange={function (page: number): void {
                throw new Error("Function not implemented.");
            }} />

        </>
    )
}

export default ProfileBilling