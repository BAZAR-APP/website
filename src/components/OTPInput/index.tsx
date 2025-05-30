import * as React from "react";
import {
    unstable_OneTimePasswordField as OTPField,
} from "radix-ui";

interface OneTimePasswordProps {
    className?: string;
    length?: number;
    onChange?: (value: string) => void;
}

const OneTimePassword: React.FC<OneTimePasswordProps> = ({
    className = '',
    length = 6,
    onChange,
}) => {
    const [otp, setOtp] = React.useState<string>("".padEnd(length, " "));

    const handleChange = (value: string) => {
        setOtp(value);
        onChange?.(value);
    };

    return (
        <OTPField.Root
            className={className}
            value={otp}
            onValueChange={handleChange}
        >
            {Array.from({ length }).map((_, index) => (
                <OTPField.Input
                    key={index}
                    className="h-[44.6px] w-[42px] border-0 bg-[#F9FAFB] rounded gap-[8px] px-3 py-2 text-center focus:outline-none"
                />
            ))}
            <OTPField.HiddenInput />
        </OTPField.Root>
    );
};

export default OneTimePassword;
