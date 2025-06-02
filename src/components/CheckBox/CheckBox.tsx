import React from "react";
import { Text, Flex, Checkbox } from "@radix-ui/themes";

type CheckboxLabelProps = {
    label: React.ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    size?: string | number;
    className?: string;
};

const CheckboxLabel: React.FC<CheckboxLabelProps> = ({
    label,
    checked,
    defaultChecked,
    onChange,
    size = "2",
    className = "",
}) => {
    return (
        <Text as="label" className={className}>
            <Flex gap="2" align="center">
                <Checkbox
                    checked={checked}
                    defaultChecked={defaultChecked}
                    onCheckedChange={(checked) => {
                        if (onChange) onChange(Boolean(checked));
                    }}
                />
                {label}
            </Flex>
        </Text>
    );
};

export default CheckboxLabel;
