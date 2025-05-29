'use client';

import { TextField, Text, Flex } from '@radix-ui/themes';
import { ReactNode } from 'react';

type CommonInputProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "number" | "search" | "time" | "text" | "hidden" | "date" | "datetime-local" | "email" | "month" | "password" | "tel" | "url" | "week";
    name?: string;
    className?: string;
};

const CommonInput: React.FC<CommonInputProps> = ({
    label,
    placeholder = '',
    value,
    onChange,
    type = 'text',
    name,
    className,
}) => {
    const inputId = name || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <Flex direction="column" gap="2">
            {label && (
                <Text
                    as="label"
                    size="2"
                    weight="bold"
                    htmlFor={inputId}
                    className="!text-primary text-[14px] font-normal"
                >
                    {label}
                </Text>
            )}
            <TextField.Root
                id={inputId}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                type={type}
                name={name}
                className={className}
            />
        </Flex>
    );
};

export default CommonInput;
