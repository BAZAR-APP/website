import React from "react";
import { Button } from "@radix-ui/themes";

type CommonButtonProps = {
    className?: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
};

const CommonButton: React.FC<CommonButtonProps> = ({
    className,
    icon,
    children,
    onClick,
}) => {
    return (
        <Button className={className} onClick={onClick}>
            {icon} {children}
        </Button>
    );
};

export default CommonButton;
