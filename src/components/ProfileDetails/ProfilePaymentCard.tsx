interface ProfilePaymentCardProps {
    title: string;
    paymentStatusText: string;
    paymentStatusColor: string;
    paymentStatusBg: string;
    paymentStatusIcon: string;
    items: { label: string; value: string }[];
    total: string;
    paidAmountText: string;
    paidAmount: string;
    paidIcon: string;
}

const ProfilePaymentCard: React.FC<ProfilePaymentCardProps> = ({
    title,
    paymentStatusText,
    paymentStatusColor,
    paymentStatusBg,
    paymentStatusIcon,
    items,
    total,
    paidAmountText,
    paidAmount,
    paidIcon,
}) => {
    return (
        <div className="flex flex-col gap-[16px] p-[24px] bg-[#f9fafb] rounded-[16px] w-full">
            <div className="flex justify-between items-center w-full">
                <span className="text-[25px] font-semibold text-[#19191a]">{title}</span>
                <div className={`flex items-center gap-[4px] px-[6px] py-[4px] rounded-[6px]`} style={{ backgroundColor: paymentStatusBg }}>
                    <div className="w-[16px] h-[16px] bg-cover bg-no-repeat" style={{ backgroundImage: `url(${paymentStatusIcon})` }} />
                    <span className={`text-[14px]`} style={{ color: paymentStatusColor }}>{paymentStatusText}</span>
                </div>
            </div>

            {/* Itemized Rows */}
            {items.map((item, index) => (
                <div key={index} className="flex justify-between w-full text-[16px] text-[#19191a]">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                </div>
            ))}

            <div className="h-px bg-[#e5e7eb]" />

            {/* Total */}
            <div className="flex justify-between text-[16px] font-medium">
                <span>Total</span>
                <span>{total} KWD</span>
            </div>

            {/* Paid Info */}
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-[8px] text-[#29397e] font-medium text-[16px]">
                    <span>{paidAmountText}</span>
                    <div className="w-[28.75px] h-[20px] bg-cover bg-no-repeat" style={{ backgroundImage: `url(${paidIcon})` }} />
                </div>
                <span className="text-[#29397e] font-medium">{paidAmount} KWD</span>
            </div>
        </div>
    );
};

export default ProfilePaymentCard