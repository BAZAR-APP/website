import React from "react";
import { Text, Flex, Checkbox as RadixCheckbox } from "@radix-ui/themes";

type CheckboxProps = {
    label: React.ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    checked,
    defaultChecked,
    onChange,
    className = "",
}) => {
    return (
        <Text as="label" className={className}>
            <Flex gap="2" align="center">
                <RadixCheckbox
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

export default Checkbox;
